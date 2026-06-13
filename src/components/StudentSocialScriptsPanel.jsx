import IconSymbol from "./IconSymbol.jsx";

/**
 * StudentSocialScriptsPanel
 *
 * Student-facing social scripts board.
 */
export default function StudentSocialScriptsPanel({ aacExpansionSettings, onSupportRequest }) {
  const items = aacExpansionSettings?.socialScripts ?? [];

  function recordItem(item) {
    onSupportRequest?.({
      type: "aac-social-script",
      label: `Social script: ${item.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel aac-expansion-panel" aria-labelledby="social-scripts-heading">
      <div>
        <p className="eyebrow">Social scripts</p>
        <h3 id="social-scripts-heading">Talk with people</h3>
      </div>

      <div className="support-choice-grid aac-grid">
        {items.map((item) => (
          <button key={item.id} type="button" className="support-choice-button aac-choice-button" aria-label={item.label} onClick={() => recordItem(item)}>
            <IconSymbol item={item} />
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
