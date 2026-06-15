import IconSymbol from "../../shared/IconSymbol.jsx";

/**
 * StudentWaitingSupport
 *
 * Waiting support card for tolerating delays and choosing what to do while waiting.
 */
import TimerButton from "../../shared/TimerButton.jsx";

export default function StudentWaitingSupport({ communicationSupportSettings, onSupportRequest }) {
  const waiting = communicationSupportSettings?.waitingSupport ?? {};
  const reasons = waiting.reasons ?? [];
  const whileWaiting = waiting.whileWaiting ?? [];

  function recordWait(item, type) {
    onSupportRequest?.({
      type: "waiting-support",
      label: `${type}: ${item.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel waiting-support-panel" aria-labelledby="waiting-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Waiting</p>
          <h3 id="waiting-heading">I am waiting</h3>
        </div>
        <TimerButton minutes={waiting.timerMinutes ?? 2} label="Wait timer" />
      </div>

      <div className="support-choice-group">
        <h4>Why?</h4>
        <div className="support-choice-grid">
          {reasons.map((item) => (
            <button key={item.id} type="button" className="support-choice-button" onClick={() => recordWait(item, "Waiting reason")}>
              <IconSymbol item={item} />
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="support-choice-group">
        <h4>While I wait, I can...</h4>
        <div className="support-choice-grid">
          {whileWaiting.map((item) => (
            <button key={item.id} type="button" className="support-choice-button" onClick={() => recordWait(item, "Waiting activity")}>
              <IconSymbol item={item} />
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
