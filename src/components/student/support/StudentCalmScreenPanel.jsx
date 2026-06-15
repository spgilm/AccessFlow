import IconSymbol from "../../shared/IconSymbol.jsx";

/**
 * StudentCalmScreenPanel
 *
 * Reduced-choice calm screen for overwhelmed states.
 */
const calmActions = [
  { id: "help", label: "I need help", emoji: "🙋", type: "calm-help", icon: "help" },
  { id: "break", label: "I need a break", emoji: "🧘", type: "calm-break", icon: "pause" },
  { id: "space", label: "I need space", emoji: "🫧", type: "calm-space", icon: "pause" },
  { id: "quiet", label: "Quiet please", emoji: "🤫", type: "calm-quiet", icon: "quiet" },
  { id: "yes", label: "Yes", emoji: "✅", type: "calm-yes", icon: "check" },
  { id: "no", label: "No", emoji: "❌", type: "calm-no", icon: "xmark" },
  { id: "wait", label: "Wait", emoji: "✋", type: "calm-wait", icon: "clock" },
  { id: "safe-person", label: "Safe person", emoji: "🛟", type: "calm-safe-person", icon: "safety" },
];

export default function StudentCalmScreenPanel({ aboutMeProfile, onSupportRequest }) {
  function recordAction(action) {
    onSupportRequest?.({
      type: "calm-screen",
      label: `Calm screen: ${action.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel calm-screen-panel" aria-labelledby="calm-screen-heading">
      <div>
        <p className="eyebrow">Calm screen</p>
        <h3 id="calm-screen-heading">What do you need?</h3>
        <p className="field-help">Fewer choices. Bigger buttons. Ask for support.</p>
      </div>

      <div className="calm-action-grid">
        {calmActions.map((action) => (
          <button key={action.id} type="button" className="calm-action-button" aria-label={action.label} onClick={() => recordAction(action)}>
            <IconSymbol item={action} />
            <strong>{action.label}</strong>
          </button>
        ))}
      </div>

      <div className="readiness-tip-card">
        <strong>What helps me:</strong>
        <p>{aboutMeProfile?.breakChoices || aboutMeProfile?.thingsThatHelp || "Give me time, space, and clear choices."}</p>
      </div>
    </section>
  );
}
