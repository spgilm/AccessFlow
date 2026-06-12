export default function ModeToggle({
  mode,
  onModeChange,
  theme,
  onThemeChange,
  textToSpeechEnabled,
  onTextToSpeechChange,
  textToSpeechAvailable = true,
}) {
  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <div className="mode-toggle combined-toggle" role="group" aria-label="AccessFlow mode and display settings">
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
      <button
        type="button"
        className="theme-segment-button"
        onClick={() => onThemeChange(nextTheme)}
        aria-label={`Switch to ${nextTheme} mode`}
        aria-pressed={isDark}
      >
        <span aria-hidden="true">{isDark ? "🌙" : "☀️"}</span>
        <span>{isDark ? "Dark" : "Light"}</span>
      </button>
      <button
        type="button"
        className="tts-segment-button"
        onClick={() => onTextToSpeechChange(!textToSpeechEnabled)}
        aria-label={textToSpeechEnabled ? "Turn read aloud off" : "Turn read aloud on"}
        aria-pressed={textToSpeechEnabled}
        disabled={!textToSpeechAvailable}
        title={textToSpeechAvailable ? "Read text aloud" : "Read aloud is not supported in this browser"}
      >
        <span className="tts-icon" aria-hidden="true">{textToSpeechEnabled ? "🔊" : "🔇"}</span>
      </button>
    </div>
  );
}
