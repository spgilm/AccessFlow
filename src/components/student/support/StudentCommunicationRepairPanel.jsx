import IconSymbol from "../../shared/IconSymbol.jsx";

/**
 * StudentCommunicationRepairPanel
 *
 * Helps the student repair communication when a message is misunderstood.
 */
const repairMessages = [
  { id: "not-mean", label: "That is not what I meant", emoji: "↩️", icon: "repeat" },
  { id: "try-again", label: "Try again", emoji: "🔁", icon: "repeat" },
  { id: "ask-yes-no", label: "Ask me yes/no", emoji: "✅", icon: "check" },
  { id: "give-choices", label: "Give me choices", emoji: "🧩", icon: "comment" },
  { id: "different-word", label: "I need a different word", emoji: "💬", icon: "comment" },
  { id: "dont-know", label: "I don't know how to say it", emoji: "❓", icon: "question" },
  { id: "wait", label: "Wait", emoji: "✋", icon: "clock" },
  { id: "show-me", label: "Show me", emoji: "👀", icon: "eye" },
];

export default function StudentCommunicationRepairPanel({ onSupportRequest }) {
  function recordRepair(item) {
    onSupportRequest?.({
      type: "communication-repair",
      label: `Communication repair: ${item.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel communication-repair-panel" aria-labelledby="communication-repair-heading">
      <div>
        <p className="eyebrow">Repair</p>
        <h3 id="communication-repair-heading">Help me say it</h3>
        <p className="field-help">Use this when people do not understand the message.</p>
      </div>

      <div className="support-choice-grid">
        {repairMessages.map((item) => (
          <button key={item.id} type="button" className="support-choice-button" aria-label={item.label} onClick={() => recordRepair(item)}>
            <IconSymbol item={item} />
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
