import IconSymbol from "./IconSymbol.jsx";

/**
 * StudentYesNoPanel
 *
 * Fast yes/no/maybe communication board for consent, preference, and basic answers.
 */
export default function StudentYesNoPanel({ selfAdvocacySupportSettings, onSupportRequest }) {
  const responses = selfAdvocacySupportSettings?.yesNoResponses ?? [];

  function recordResponse(item) {
    onSupportRequest?.({
      type: "yes-no-response",
      label: `Response: ${item.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel self-advocacy-panel yes-no-panel" aria-labelledby="yes-no-heading">
      <div>
        <p className="eyebrow">Answer</p>
        <h3 id="yes-no-heading">Yes, no, or something else</h3>
      </div>

      <div className="support-choice-grid">
        {responses.map((item) => (
          <button
            key={item.id}
            type="button"
            className="support-choice-button"
            aria-label={item.label}
            onClick={() => recordResponse(item)}
          >
            <IconSymbol item={item} />
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
