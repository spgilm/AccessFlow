import IconSymbol from "./IconSymbol.jsx";

/**
 * StudentAacCoreWordsPanel
 *
 * Student-facing core words board.
 */
export default function StudentAacCoreWordsPanel({ aacExpansionSettings, onSupportRequest }) {
  const items = aacExpansionSettings?.coreWords ?? [];

  function recordItem(item) {
    onSupportRequest?.({
      type: "aac-core-word",
      label: `Core word: ${item.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel aac-expansion-panel" aria-labelledby="core-words-heading">
      <div>
        <p className="eyebrow">Core words</p>
        <h3 id="core-words-heading">Useful words</h3>
        <p className="field-help">Words that can work in many places.</p>
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
