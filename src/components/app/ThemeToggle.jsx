/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
export default function ThemeToggle({ theme, onThemeChange }) {
  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <div className="theme-toggle-wrap" aria-label="Display theme">
      <span className="theme-icon" aria-hidden="true">☀️</span>
      <button
        type="button"
        className={`theme-toggle ${isDark ? "is-dark" : "is-light"}`}
        onClick={() => onThemeChange(nextTheme)}
        aria-label={`Switch to ${nextTheme} mode`}
        aria-pressed={isDark}
      >
        <span className="theme-toggle-track" aria-hidden="true">
          <span className="theme-toggle-thumb">
            {isDark ? "🌙" : "☀️"}
          </span>
        </span>
      </button>
      <span className="theme-icon" aria-hidden="true">🌙</span>
    </div>
  );
}
