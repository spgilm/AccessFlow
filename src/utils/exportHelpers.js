/**
 * Backup/export/download helpers for JSON, CSV, and text outputs.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import {
  buildActivityBreakdown,
  buildDailyProgressNote,
  getCompletionStats,
} from "./documentationHelpers.js";

export const ACCESSFLOW_BACKUP_VERSION = "accessflow-backup-v1";

export function buildBackupPayload({
  profiles,
  templates,
  selectedProfileId,
  documentationDate,
  mode,
  studentViewMode,
}) {
  return {
    app: "AccessFlow",
    backupVersion: ACCESSFLOW_BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      profiles,
      templates,
      selectedProfileId,
      documentationDate,
      mode,
      studentViewMode,
    },
  };
}

export function validateBackupPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "Backup file is not valid JSON data.";
  }

  if (payload.app !== "AccessFlow") {
    return "Backup file does not appear to be an AccessFlow backup.";
  }

  if (!payload.data || typeof payload.data !== "object") {
    return "Backup file is missing the data section.";
  }

  if (!Array.isArray(payload.data.profiles)) {
    return "Backup file is missing profiles.";
  }

  if (!Array.isArray(payload.data.templates)) {
    return "Backup file is missing templates.";
  }

  if (payload.data.profiles.length === 0) {
    return "Backup file must contain at least one profile.";
  }

  return "";
}

export function downloadTextFile(filename, content, mimeType = "text/plain") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export function buildSafeFilename(value) {
  return String(value || "accessflow")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80) || "accessflow";
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export function buildActivityCsv(profile, activities, dailyNote) {
  const rows = [
    [
      "date",
      "profile",
      "activity",
      "activity_status",
      "completed_steps",
      "total_steps",
      "step_percent",
      "prompt_level",
      "engagement",
    ],
  ];

  for (const activity of activities) {
    const totalSteps = activity.steps.length;
    const completedSteps = activity.steps.filter((step) => step.completed).length;
    const stepPercent = totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

    rows.push([
      dailyNote.date,
      profile?.name ?? "Unknown profile",
      activity.label,
      activity.completed ? "complete" : "not complete",
      completedSteps,
      totalSteps,
      `${stepPercent}%`,
      dailyNote.promptLevel || "Not recorded",
      dailyNote.engagement || "Not recorded",
    ]);
  }

  return rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

export function buildExportSummary(profile, activities, dailyNote) {
  const stats = getCompletionStats(activities);

  return [
    `Profile: ${profile?.name ?? "Unknown profile"}`,
    `Date: ${dailyNote.date}`,
    `Activities: ${stats.completedActivities}/${stats.totalActivities}`,
    `Steps: ${stats.completedSteps}/${stats.totalSteps}`,
    ``,
    buildActivityBreakdown(activities),
    ``,
    buildDailyProgressNote(profile, activities, dailyNote),
  ].join("\n");
}
