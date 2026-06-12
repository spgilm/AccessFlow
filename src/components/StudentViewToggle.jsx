/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
export default function StudentViewToggle({ viewMode, onViewModeChange }) {
  const normalizedMode = viewMode === "firstThen" ? "firstThen" : "schedule";

  return (
    <div className="student-view-toggle" role="group" aria-label="Choose student view">
      <button
        type="button"
        className={normalizedMode === "schedule" ? "is-active" : ""}
        onClick={() => onViewModeChange("schedule")}
        aria-pressed={normalizedMode === "schedule"}
      >
        My Schedule
      </button>
      <button
        type="button"
        className={normalizedMode === "firstThen" ? "is-active" : ""}
        onClick={() => onViewModeChange("firstThen")}
        aria-pressed={normalizedMode === "firstThen"}
      >
        First / Then
      </button>
    </div>
  );
}
