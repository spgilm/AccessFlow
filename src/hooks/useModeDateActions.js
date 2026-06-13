/**
 * useModeDateActions
 *
 * Groups mode/theme/student-view/date handlers outside App.jsx.
 */
import { getTodayDateKey } from "../utils/documentationHelpers.js";
import { getScheduleForDate } from "../utils/scheduleDateHelpers.js";

export function useModeDateActions({
  selectedProfile,
  safeStaffSecurity,
  staffUnlocked,
  setStaffUnlocked,
  setMode,
  setTheme,
  setStudentViewMode,
  setScheduleDate,
  setDocumentationDate,
  setSelectedActivityId,
  clearPortableStatuses,
  setAnnouncement,
}) {
  function handleModeChange(nextMode) {
    if (nextMode === "staff" && safeStaffSecurity.pinEnabled && !staffUnlocked) {
      const enteredPin = window.prompt("Enter staff PIN");

      if (enteredPin !== safeStaffSecurity.pin) {
        setAnnouncement("Staff PIN incorrect.");
        return;
      }

      setStaffUnlocked(true);
    }

    setMode(nextMode);
    setAnnouncement(`${nextMode === "student" ? "Student" : "Staff"} Mode selected.`);
  }

  function handleThemeChange(nextTheme) {
    const safeTheme = nextTheme === "dark" ? "dark" : "light";
    setTheme(safeTheme);
    setAnnouncement(`${safeTheme === "dark" ? "Dark" : "Light"} mode selected.`);
  }

  function handleStudentViewModeChange(nextViewMode) {
    setStudentViewMode(nextViewMode);

    const viewLabel = nextViewMode === "firstThen" ? "First / Then" : "My Schedule";
    setAnnouncement(`${viewLabel} view selected.`);
  }

  function handleScheduleDateChange(nextDate) {
    const safeDate = nextDate || getTodayDateKey();
    setScheduleDate(safeDate);
    setDocumentationDate(safeDate);
    setSelectedActivityId(getScheduleForDate(selectedProfile, safeDate)[0]?.id ?? null);
    clearPortableStatuses();
    setAnnouncement(`Schedule date changed to ${safeDate}.`);
  }

  function handleDocumentationDateChange(nextDate) {
    setDocumentationDate(nextDate || getTodayDateKey());
    clearPortableStatuses();
  }

  return {
    handleModeChange,
    handleThemeChange,
    handleStudentViewModeChange,
    handleScheduleDateChange,
    handleDocumentationDateChange,
  };
}
