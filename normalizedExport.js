/**
 * Documentation summary helpers for completion stats, step data, support events, and daily notes.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
export function getTodayDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function createBlankDailyNote(date = getTodayDateKey()) {
  return {
    date,
    promptLevel: "Not recorded",
    engagement: "Not recorded",
    observation: "",
    supportStrategies: "",
    nextSteps: "",
    updatedAt: new Date().toISOString(),
  };
}

export function getDailyNote(profile, date) {
  return (
    profile?.documentationByDate?.[date] ?? createBlankDailyNote(date)
  );
}

export function getCompletionStats(activities) {
  const totalActivities = activities.length;
  const completedActivities = activities.filter((activity) => activity.completed).length;
  const totalSteps = activities.reduce(
    (count, activity) => count + activity.steps.length,
    0
  );
  const completedSteps = activities.reduce(
    (count, activity) =>
      count + activity.steps.filter((step) => step.completed).length,
    0
  );

  return {
    totalActivities,
    completedActivities,
    totalSteps,
    completedSteps,
    activityPercent:
      totalActivities === 0 ? 0 : Math.round((completedActivities / totalActivities) * 100),
    stepPercent: totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100),
  };
}

export function buildActivityBreakdown(activities) {
  if (activities.length === 0) {
    return "No scheduled activities were recorded.";
  }

  return activities
    .map((activity) => {
      const completeSteps = activity.steps.filter((step) => step.completed).length;
      const totalSteps = activity.steps.length;
      const status = activity.completed ? "complete" : "in progress/not complete";

      const promptSummary = activity.steps
        .filter((step) => step.promptLevel)
        .map((step) => `${step.label}: ${step.promptLevel}`)
        .join("; ");
      const timerSummary = activity.timerMinutes ? ` Timer: ${activity.timerMinutes} min.` : "";

      return `- ${activity.label}: ${status}; ${completeSteps}/${totalSteps} steps complete.${timerSummary}${promptSummary ? ` Support: ${promptSummary}.` : ""}`;
    })
    .join("\n");
}

export function buildDailyProgressNote(profile, activities, dailyNote, supportEvents = []) {
  const stats = getCompletionStats(activities);
  const profileName = profile?.name ?? "Selected profile";

  return [
    `AccessFlow Daily Progress Note`,
    `Date: ${dailyNote.date}`,
    `Student/Client: ${profileName}`,
    ``,
    `Completion Summary:`,
    `${stats.completedActivities}/${stats.totalActivities} activities complete (${stats.activityPercent}%).`,
    `${stats.completedSteps}/${stats.totalSteps} task-analysis steps complete (${stats.stepPercent}%).`,
    ``,
    `Activity Breakdown:`,
    buildActivityBreakdown(activities),
    ``,
    `Prompt Level Used: ${dailyNote.promptLevel || "Not recorded"}`,
    `Engagement/Participation: ${dailyNote.engagement || "Not recorded"}`,
    ``,
    `Student Support / Choice Events:`,
    supportEvents.length === 0
      ? "No support or choice events recorded."
      : supportEvents
          .map((event) => `- ${new Date(event.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}: ${event.label}${event.activityLabel ? ` during ${event.activityLabel}` : ""}`)
          .join("\n"),
    ``,
    `Staff Observation:`,
    dailyNote.observation?.trim() || "No observation recorded.",
    ``,
    `Support Strategies Used:`,
    dailyNote.supportStrategies?.trim() || "No support strategies recorded.",
    ``,
    `Next Steps / Follow-Up:`,
    dailyNote.nextSteps?.trim() || "No next steps recorded.",
  ].join("\n");
}
