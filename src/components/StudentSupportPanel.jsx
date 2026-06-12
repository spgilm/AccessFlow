/**
 * Student-facing support request buttons. Logs help/break/confusion/sensory events for staff review.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
const supportButtons = [
  { type: "help", label: "Help", phrase: "I need help", emoji: "🙋" },
  { type: "break", label: "Break", phrase: "I need a break", emoji: "🧘" },
  { type: "confused", label: "Confused", phrase: "I don't understand", emoji: "❓" },
  { type: "too-hard", label: "Too hard", phrase: "This is too hard", emoji: "🧱" },
  { type: "too-loud", label: "Too loud", phrase: "It is too loud", emoji: "🔇" },
  { type: "upset", label: "Upset", phrase: "I feel upset", emoji: "💙" },
];

export default function StudentSupportPanel({ currentActivity, onSupportRequest }) {
  return (
    <section className="panel support-panel" aria-labelledby="support-heading">
      <div className="focus-header">
        <p className="eyebrow">Support</p>
        <h2 id="support-heading">I need...</h2>
      </div>

      <div className="support-button-grid">
        {supportButtons.map((item) => (
          <button
            key={item.type}
            type="button"
            className="support-button"
            onClick={() =>
              onSupportRequest({
                type: item.type,
                label: item.phrase,
                activityId: currentActivity?.id ?? null,
                activityLabel: currentActivity?.label ?? null,
              })
            }
          >
            <span aria-hidden="true">{item.emoji}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
