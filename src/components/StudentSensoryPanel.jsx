import IconSymbol from "./IconSymbol.jsx";

/**
 * StudentSensoryPanel
 *
 * Student/client-facing sensory need requests.
 */
export default function StudentSensoryPanel({ communicationSupportSettings, onSupportRequest }) {
  const requests = communicationSupportSettings?.sensoryRequests ?? [];

  function requestSupport(item) {
    onSupportRequest?.({
      type: "sensory-request",
      label: `Sensory request: ${item.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel sensory-panel" aria-labelledby="sensory-heading">
      <div>
        <p className="eyebrow">Sensory</p>
        <h3 id="sensory-heading">What do you need?</h3>
      </div>

      <div className="support-choice-grid">
        {requests.map((item) => (
          <button
            key={item.id}
            type="button"
            className="support-choice-button"
            aria-label={item.label}
            onClick={() => requestSupport(item)}
          >
            <IconSymbol item={item} />
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
