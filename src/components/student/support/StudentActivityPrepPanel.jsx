import IconSymbol from "../../shared/IconSymbol.jsx";

/**
 * StudentActivityPrepPanel
 *
 * Helps the student preview the current/next activity and request supports before starting.
 */
const prepChoices = [
  { id: "ready", label: "I’m ready", emoji: "✅", icon: "check" },
  { id: "help", label: "I need help", emoji: "🙋", icon: "help" },
  { id: "break-first", label: "Break first", emoji: "🧘", icon: "pause" },
  { id: "more-time", label: "More time", emoji: "🕒", icon: "clock" },
  { id: "show-first", label: "Show first step", emoji: "1️⃣", icon: "eye" },
  { id: "quiet", label: "Quiet first", emoji: "🤫", icon: "quiet" },
];

export default function StudentActivityPrepPanel({ currentActivity, aboutMeProfile, onSupportRequest }) {
  if (!currentActivity) {
    return null;
  }

  const firstStep = currentActivity.steps?.[0]?.label ?? "Look at the activity card.";

  function recordChoice(choice) {
    onSupportRequest?.({
      type: "activity-prep",
      label: `Activity prep: ${choice.label} for ${currentActivity.label}`,
      activityId: currentActivity.id,
      activityLabel: currentActivity.label,
    });
  }

  return (
    <section className="student-communication-panel activity-readiness-panel" aria-labelledby="activity-prep-heading">
      <div>
        <p className="eyebrow">Get ready</p>
        <h3 id="activity-prep-heading">Prepare for {currentActivity.label}</h3>
        <p className="field-help">First step: {firstStep}</p>
      </div>

      <div className="readiness-tip-card">
        <strong>Things that help me:</strong>
        <p>{aboutMeProfile?.thingsThatHelp || "Use clear choices and give me time."}</p>
      </div>

      <div className="support-choice-grid">
        {prepChoices.map((choice) => (
          <button key={choice.id} type="button" className="support-choice-button" aria-label={choice.label} onClick={() => recordChoice(choice)}>
            <IconSymbol item={choice} />
            <strong>{choice.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
