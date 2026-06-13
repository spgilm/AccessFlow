/**
 * Handoff report helpers.
 */
import { getCompletionStats } from "./documentationHelpers.js";

export function buildHandoffReport({
  profile,
  activities,
  dailyNote,
  supportEvents,
  progressGoals,
  checkIns,
  regulationPlan,
}) {
  const stats = getCompletionStats(activities);
  const name = profile?.name ?? "Selected profile";
  const latestCheckIn = Array.isArray(checkIns) ? checkIns[checkIns.length - 1] : null;
  const activeGoals = (progressGoals ?? []).filter((goal) => goal.isActive !== false);

  return [
    "AccessFlow Handoff Report",
    `Student/Client: ${name}`,
    `Date: ${dailyNote?.date ?? ""}`,
    "",
    "Schedule:",
    `${stats.completedActivities}/${stats.totalActivities} activities complete.`,
    `${stats.completedSteps}/${stats.totalSteps} steps complete.`,
    "",
    "Latest Check-In:",
    latestCheckIn
      ? `${latestCheckIn.feeling || "Feeling not recorded"}; energy: ${latestCheckIn.energy || "not recorded"}; need: ${latestCheckIn.need || "not recorded"}.`
      : "No check-in recorded.",
    "",
    "Support / Choice Events:",
    supportEvents?.length
      ? supportEvents
          .slice(-8)
          .map((event) => `- ${event.label}${event.activityLabel ? ` during ${event.activityLabel}` : ""}`)
          .join("\n")
      : "No support events recorded.",
    "",
    "Active Goals:",
    activeGoals.length
      ? activeGoals.map((goal) => `- ${goal.title} (${goal.linkedActivityName || "no linked activity"})`).join("\n")
      : "No active goals configured.",
    "",
    "Regulation Plan Quick Notes:",
    `Triggers: ${regulationPlan?.triggers || "Not recorded"}`,
    `Calming strategies: ${regulationPlan?.calmingStrategies || "Not recorded"}`,
    `Staff response: ${regulationPlan?.staffResponse || "Not recorded"}`,
    "",
    "Daily Note:",
    dailyNote?.observation?.trim() || "No daily observation recorded.",
  ].join("\n");
}
