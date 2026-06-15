import IconSymbol from "../../shared/IconSymbol.jsx";

/**
 * StudentQuickPhrasesPanel
 *
 * Student-facing quick phrase board.
 */
export default function StudentQuickPhrasesPanel({ aacExpansionSettings, onSupportRequest }) {
  const items = aacExpansionSettings?.quickPhrases ?? [];

  function recordItem(item) {
    onSupportRequest?.({
      type: "aac-quick-phrase",
      label: `Quick phrase: ${item.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel aac-expansion-panel" aria-labelledby="quick-phrases-heading">
      <div>
        <p className="eyebrow">Quick phrases</p>
        <h3 id="quick-phrases-heading">Say it fast</h3>
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
