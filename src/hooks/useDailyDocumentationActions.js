/**
 * useDailyDocumentationActions
 *
 * Groups daily-note copy/download/update handlers outside App.jsx.
 */
import {
  buildDailyProgressNote,
  createBlankDailyNote,
} from "../utils/documentationHelpers.js";
import {
  buildActivityCsv,
  buildSafeFilename,
  downloadTextFile,
} from "../utils/exportHelpers.js";

export function useDailyDocumentationActions({
  selectedProfile,
  activities,
  dailyNote,
  supportEvents,
  documentationDate,
  updateSelectedProfile,
  clearPortableStatuses,
  setCopyStatus,
}) {
  function handleUpdateDailyNote(nextDailyNote) {
    if (!selectedProfile) {
      return;
    }

    updateSelectedProfile((profile) => ({
      ...profile,
      documentationByDate: {
        ...(profile.documentationByDate ?? {}),
        [documentationDate]: {
          ...createBlankDailyNote(documentationDate),
          ...nextDailyNote,
          date: documentationDate,
          updatedAt: new Date().toISOString(),
        },
      },
    }));

    clearPortableStatuses();
  }

  async function handleCopyDailyNote() {
    const text = buildDailyProgressNote(selectedProfile, activities, dailyNote, supportEvents);

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API unavailable.");
      }

      await navigator.clipboard.writeText(text);
      setCopyStatus("Progress note copied.");
    } catch {
      setCopyStatus("Copy unavailable. Select the generated note text and copy it manually.");
    }
  }

  function handleDownloadDailyNote() {
    const filename = `${documentationDate}-${buildSafeFilename(selectedProfile?.name)}-accessflow-note.txt`;
    const content = buildDailyProgressNote(selectedProfile, activities, dailyNote, supportEvents);

    downloadTextFile(filename, content, "text/plain");
    setCopyStatus("Daily note downloaded.");
  }

  function handleDownloadActivityCsv() {
    const filename = `${documentationDate}-${buildSafeFilename(selectedProfile?.name)}-activity-summary.csv`;
    const content = buildActivityCsv(selectedProfile, activities, dailyNote);

    downloadTextFile(filename, content, "text/csv");
    setCopyStatus("Activity CSV downloaded.");
  }

  return {
    handleUpdateDailyNote,
    handleCopyDailyNote,
    handleDownloadDailyNote,
    handleDownloadActivityCsv,
  };
}
