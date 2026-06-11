export default function ModeToggle({ mode, onModeChange }) {
  return (
    <div className="mode-toggle" role="group" aria-label="Choose AccessFlow mode">
      <button
        type="button"
        className={mode === "student" ? "is-active" : ""}
        onClick={() => onModeChange("student")}
        aria-pressed={mode === "student"}
      >
        Student Mode
      </button>
      <button
        type="button"
        className={mode === "staff" ? "is-active" : ""}
        onClick={() => onModeChange("staff")}
        aria-pressed={mode === "staff"}
      >
        Staff Mode
      </button>
    </div>
  );
}
