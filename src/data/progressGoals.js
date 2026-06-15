/**
 * Progress goal data helpers.
 *
 * Goals are profile-specific and intentionally simple for the prototype.
 * A goal can link to an activity name and measure completion across a week.
 */
import { createId } from "../utils/formatters.js";

export const defaultProgressGoals = [];

export function createProgressGoal({
  title = "New goal",
  linkedActivityName = "",
  targetDays = 4,
  targetPercent = 80,
  notes = "",
} = {}) {
  return {
    id: createId("goal"),
    title: String(title || "New goal").trim(),
    linkedActivityName: String(linkedActivityName || "").trim(),
    targetDays: Number(targetDays || 0),
    targetPercent: Number(targetPercent || 0),
    notes,
    isActive: true,
    createdAt: new Date().toISOString(),
  };
}

export function getProgressGoals(profile) {
  return Array.isArray(profile?.progressGoals) ? profile.progressGoals : defaultProgressGoals;
}
