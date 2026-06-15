/**
 * Weekly progress dashboard helpers.
 *
 * These functions summarize date-based schedules, completion data, step prompt data,
 * support/choice events, and profile goals.
 */
import { getCompletionStats } from "./documentationHelpers.js";
import { getScheduleForDate } from "./scheduleDateHelpers.js";

function parseDateKey(dateKey) {
  const [year, month, day] = String(dateKey || "").split("-").map(Number);
  return new Date(year || 1970, (month || 1) - 1, day || 1);
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getWeekDateKeys(anchorDateKey) {
  const anchor = parseDateKey(anchorDateKey);
  const day = anchor.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(anchor);
  monday.setDate(anchor.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return toDateKey(date);
  });
}

function getEventsForWeek(supportEvents, weekDateKeys) {
  const dateSet = new Set(weekDateKeys);

  return (supportEvents ?? []).filter((event) => {
    if (event.date) {
      return dateSet.has(event.date);
    }

    if (!event.createdAt) {
      return false;
    }

    return dateSet.has(toDateKey(new Date(event.createdAt)));
  });
}

function summarizePromptLevels(activitiesByDate) {
  const promptCounts = {};

  Object.values(activitiesByDate).forEach((activities) => {
    activities.forEach((activity) => {
      activity.steps?.forEach((step) => {
        if (!step.promptLevel) {
          return;
        }

        promptCounts[step.promptLevel] = (promptCounts[step.promptLevel] ?? 0) + 1;
      });
    });
  });

  return promptCounts;
}

function summarizeGoals(goals, activitiesByDate, weekDateKeys) {
  return (goals ?? [])
    .filter((goal) => goal.isActive !== false)
    .map((goal) => {
      const linkedName = goal.linkedActivityName?.toLowerCase().trim();
      const daysWithActivity = [];
      const daysCompleted = [];

      weekDateKeys.forEach((dateKey) => {
        const activities = activitiesByDate[dateKey] ?? [];
        const matches = linkedName
          ? activities.filter((activity) => activity.label?.toLowerCase().includes(linkedName))
          : [];

        if (matches.length > 0) {
          daysWithActivity.push(dateKey);
        }

        if (matches.some((activity) => activity.completed)) {
          daysCompleted.push(dateKey);
        }
      });

      const percent =
        daysWithActivity.length === 0
          ? 0
          : Math.round((daysCompleted.length / daysWithActivity.length) * 100);
      const targetDaysMet = Number(goal.targetDays || 0) > 0 && daysCompleted.length >= Number(goal.targetDays);
      const targetPercentMet = Number(goal.targetPercent || 0) > 0 && percent >= Number(goal.targetPercent);
      const isMet = targetDaysMet || targetPercentMet;

      return {
        ...goal,
        daysWithActivity,
        daysCompleted,
        percent,
        isMet,
      };
    });
}

export function buildWeeklyProgressSummary(profile, anchorDateKey, goals = []) {
  const weekDateKeys = getWeekDateKeys(anchorDateKey);
  const activitiesByDate = Object.fromEntries(
    weekDateKeys.map((dateKey) => [dateKey, getScheduleForDate(profile, dateKey)])
  );
  const dailyStats = weekDateKeys.map((dateKey) => ({
    dateKey,
    stats: getCompletionStats(activitiesByDate[dateKey]),
  }));
  const totals = dailyStats.reduce(
    (summary, item) => ({
      activities: summary.activities + item.stats.totalActivities,
      completedActivities: summary.completedActivities + item.stats.completedActivities,
      steps: summary.steps + item.stats.totalSteps,
      completedSteps: summary.completedSteps + item.stats.completedSteps,
    }),
    { activities: 0, completedActivities: 0, steps: 0, completedSteps: 0 }
  );
  const supportEvents = getEventsForWeek(profile?.supportEvents ?? [], weekDateKeys);
  const supportCounts = supportEvents.reduce((counts, event) => {
    const label = event.label || event.type || "Event";
    counts[label] = (counts[label] ?? 0) + 1;
    return counts;
  }, {});
  const promptCounts = summarizePromptLevels(activitiesByDate);
  const goalSummaries = summarizeGoals(goals, activitiesByDate, weekDateKeys);

  return {
    weekDateKeys,
    activitiesByDate,
    dailyStats,
    totals,
    activityPercent:
      totals.activities === 0 ? 0 : Math.round((totals.completedActivities / totals.activities) * 100),
    stepPercent: totals.steps === 0 ? 0 : Math.round((totals.completedSteps / totals.steps) * 100),
    supportEvents,
    supportCounts,
    promptCounts,
    goalSummaries,
  };
}

export function buildWeeklyProgressReport(profile, anchorDateKey, goals = []) {
  const summary = buildWeeklyProgressSummary(profile, anchorDateKey, goals);
  const profileName = profile?.name ?? "Selected profile";

  const supportLines =
    Object.keys(summary.supportCounts).length === 0
      ? ["No support or choice events recorded this week."]
      : Object.entries(summary.supportCounts).map(([label, count]) => `- ${label}: ${count}`);

  const promptLines =
    Object.keys(summary.promptCounts).length === 0
      ? ["No step-level prompt/support data recorded this week."]
      : Object.entries(summary.promptCounts).map(([level, count]) => `- ${level}: ${count}`);

  const goalLines =
    summary.goalSummaries.length === 0
      ? ["No active goals configured."]
      : summary.goalSummaries.map((goal) =>
          `- ${goal.title}: ${goal.daysCompleted.length}/${goal.daysWithActivity.length} scheduled days complete (${goal.percent}%). ${goal.isMet ? "Target met." : "Target not met yet."}`
        );

  const dailyLines = summary.dailyStats.map(
    ({ dateKey, stats }) =>
      `- ${dateKey}: ${stats.completedActivities}/${stats.totalActivities} activities; ${stats.completedSteps}/${stats.totalSteps} steps.`
  );

  return [
    "AccessFlow Weekly Progress Summary",
    `Student/Client: ${profileName}`,
    `Week: ${summary.weekDateKeys[0]} to ${summary.weekDateKeys[6]}`,
    "",
    "Weekly Completion:",
    `${summary.totals.completedActivities}/${summary.totals.activities} activities complete (${summary.activityPercent}%).`,
    `${summary.totals.completedSteps}/${summary.totals.steps} steps complete (${summary.stepPercent}%).`,
    "",
    "Daily Breakdown:",
    ...dailyLines,
    "",
    "Goal Progress:",
    ...goalLines,
    "",
    "Prompt / Support Levels:",
    ...promptLines,
    "",
    "Support / Choice Events:",
    ...supportLines,
  ].join("\n");
}
