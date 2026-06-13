/**
 * useStaffExportActions
 *
 * Groups Staff Mode export/report actions outside App.jsx.
 */
import { getTodayDateKey } from "../utils/documentationHelpers.js";
import {
  buildSafeFilename,
  downloadTextFile,
} from "../utils/exportHelpers.js";
import { getScheduleForDate } from "../utils/scheduleDateHelpers.js";
import { buildNormalizedWorkspaceExport } from "../utils/normalizedExport.js";
import {
  buildGoalCsv,
  buildPromptLevelCsv,
  buildSingleProfileExportPayload,
  buildSingleProfileFilename,
  buildSupportEventCsv,
} from "../utils/staffExportHelpers.js";

export function useStaffExportActions({
  selectedProfile,
  progressGoals,
  supportEvents,
  weeklyProgressSummary,
  weeklyProgressReport,
  handoffReport,
  profiles,
  templates,
  setCopyStatus,
  setExportStatus,
}) {
  function handleDownloadWeeklyReport() {
    const filename = buildSafeFilename(
      `accessflow-weekly-${selectedProfile?.name ?? "profile"}-${weeklyProgressSummary.weekDateKeys[0]}`
    );

    downloadTextFile(`${filename}.txt`, weeklyProgressReport, "text/plain");
    setCopyStatus("Weekly report downloaded.");
  }

  function handleDownloadHandoffReport() {
    downloadTextFile(
      `${getTodayDateKey()}-${buildSafeFilename(selectedProfile?.name ?? "profile")}-handoff.txt`,
      handoffReport,
      "text/plain"
    );

    setCopyStatus("Handoff report downloaded.");
  }

  function handleDownloadNormalizedExport() {
    const normalizedPayload = buildNormalizedWorkspaceExport({ profiles, templates });

    downloadTextFile(
      `${getTodayDateKey()}-accessflow-normalized-v23.json`,
      JSON.stringify(normalizedPayload, null, 2),
      "application/json"
    );

    setExportStatus("Normalized JSON export downloaded.");
  }

  function handleDownloadGoalCsv() {
    const csv = buildGoalCsv(progressGoals);
    downloadTextFile(`${buildSafeFilename(selectedProfile?.name ?? "profile")}-goals.csv`, csv, "text/csv");
    setCopyStatus("Goal CSV downloaded.");
  }

  function handleDownloadSupportEventCsv() {
    const csv = buildSupportEventCsv(supportEvents);
    downloadTextFile(`${buildSafeFilename(selectedProfile?.name ?? "profile")}-support-events.csv`, csv, "text/csv");
    setCopyStatus("Support event CSV downloaded.");
  }

  function handleDownloadPromptCsv() {
    const csv = buildPromptLevelCsv(weeklyProgressSummary.weekDateKeys, selectedProfile, getScheduleForDate);
    downloadTextFile(`${buildSafeFilename(selectedProfile?.name ?? "profile")}-prompt-levels.csv`, csv, "text/csv");
    setCopyStatus("Prompt-level CSV downloaded.");
  }

  function handleExportSingleProfile() {
    const payload = buildSingleProfileExportPayload(selectedProfile);

    downloadTextFile(
      buildSingleProfileFilename(selectedProfile?.name, buildSafeFilename),
      JSON.stringify(payload, null, 2),
      "application/json"
    );
    setExportStatus("Single-profile backup exported.");
  }

  return {
    handleDownloadWeeklyReport,
    handleDownloadHandoffReport,
    handleDownloadNormalizedExport,
    handleDownloadGoalCsv,
    handleDownloadSupportEventCsv,
    handleDownloadPromptCsv,
    handleExportSingleProfile,
  };
}
