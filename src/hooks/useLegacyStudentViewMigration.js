/**
 * useLegacyStudentViewMigration
 *
 * Converts old saved StudentView mode values to current values.
 */
import { useEffect } from "react";

export function useLegacyStudentViewMigration(studentViewMode, setStudentViewMode) {
  useEffect(() => {
    if (studentViewMode === "builder") {
      setStudentViewMode("schedule");
    }
  }, [studentViewMode, setStudentViewMode]);
}
