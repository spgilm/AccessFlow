export default function StudentViewToggle({ viewMode, onViewModeChange }) {
  return (
    <div className="student-view-toggle" role="group" aria-label="Choose student view">
      <button
        type="button"
        className={viewMode === "schedule" ? "is-active" : ""}
        onClick={() => onViewModeChange("schedule")}
        aria-pressed={viewMode === "schedule"}
      >
        Use Schedule
      </button>
      <button
        type="button"
        className={viewMode === "builder" ? "is-active" : ""}
        onClick={() => onViewModeChange("builder")}
        aria-pressed={viewMode === "builder"}
      >
        Plan My Day
      </button>
      <button
        type="button"
        className={viewMode === "firstThen" ? "is-active" : ""}
        onClick={() => onViewModeChange("firstThen")}
        aria-pressed={viewMode === "firstThen"}
      >
        First / Then
      </button>
    </div>
  );
}
