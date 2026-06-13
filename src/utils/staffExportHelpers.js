/**
 * Staff export helpers.
 *
 * Builds CSV/text payloads used by Staff Mode export actions.
 */
import { getTodayDateKey } from "./documentationHelpers.js";

function csvEscape(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

export function rowsToCsv(rows) {
  return rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

export function buildGoalCsv(progressGoals = []) {
  return rowsToCsv([
    ["Goal", "Linked Activity", "Target Days", "Target Percent", "Active"],
    ...progressGoals.map((goal) => [
      goal.title,
      goal.linkedActivityName,
      goal.targetDays,
      goal.targetPercent,
      goal.isActive !== false ? "yes" : "no",
    ]),
  ]);
}

export function buildSupportEventCsv(supportEvents = []) {
  return rowsToCsv([
    ["Date", "Time", "Type", "Label", "Activity"],
    ...supportEvents.map((event) => [
      event.date ?? "",
      event.createdAt ? new Date(event.createdAt).toLocaleTimeString() : "",
      event.type ?? "",
      event.label ?? "",
      event.activityLabel ?? "",
    ]),
  ]);
}

export function buildPromptLevelCsv(weekDateKeys, selectedProfile, getScheduleForDate) {
  const rows = [["Date", "Activity", "Step", "Prompt Level"]];

  weekDateKeys.forEach((dateKey) => {
    const dateActivities = getScheduleForDate(selectedProfile, dateKey);
    dateActivities.forEach((activity) => {
      activity.steps?.forEach((step) => {
        if (step.promptLevel) {
          rows.push([dateKey, activity.label, step.label, step.promptLevel]);
        }
      });
    });
  });

  return rowsToCsv(rows);
}

export function buildSingleProfileExportPayload(selectedProfile) {
  return {
    schemaVersion: 20,
    exportedAt: new Date().toISOString(),
    profile: selectedProfile,
  };
}

export function buildSingleProfileFilename(profileName, buildSafeFilename) {
  return `${getTodayDateKey()}-${buildSafeFilename(profileName ?? "profile")}-profile.json`;
}
