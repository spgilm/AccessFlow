import IconSymbol from "../../shared/IconSymbol.jsx";

/**
 * StudentStuckPathway
 *
 * Helps a student communicate why they are stuck and what support might help.
 */
import { useState } from "react";

export default function StudentStuckPathway({ selfAdvocacySupportSettings, onSupportRequest }) {
  const [reason, setReason] = useState(null);
  const [strategy, setStrategy] = useState(null);

  const reasons = selfAdvocacySupportSettings?.stuckReasons ?? [];
  const strategies = selfAdvocacySupportSettings?.stuckStrategies ?? [];

  function record(nextReason = reason, nextStrategy = strategy) {
    if (!nextReason && !nextStrategy) {
      return;
    }

    const label = [
      "Stuck:",
      nextReason?.label,
      nextStrategy ? `try ${nextStrategy.label}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    onSupportRequest?.({
      type: "stuck-pathway",
      label,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel self-advocacy-panel stuck-pathway-panel" aria-labelledby="stuck-pathway-heading">
      <div>
        <p className="eyebrow">Stuck</p>
        <h3 id="stuck-pathway-heading">I’m stuck</h3>
      </div>

      <div className="support-builder-summary" aria-live="polite">
        <strong>Message:</strong>{" "}
        {[reason?.label, strategy ? `Try: ${strategy.label}` : ""].filter(Boolean).join(" → ") || "Choose what is hard"}
      </div>

      <ChoiceGroup title="I’m stuck because...">
        {reasons.map((item) => (
          <ChoiceButton
            key={item.id}
            item={item}
            selected={reason?.id === item.id}
            onClick={() => {
              setReason(item);
              record(item, strategy);
            }}
          />
        ))}
      </ChoiceGroup>

      <ChoiceGroup title="Try...">
        {strategies.map((item) => (
          <ChoiceButton
            key={item.id}
            item={item}
            selected={strategy?.id === item.id}
            onClick={() => {
              setStrategy(item);
              record(reason, item);
            }}
          />
        ))}
      </ChoiceGroup>
    </section>
  );
}

function ChoiceGroup({ title, children }) {
  return (
    <div className="support-choice-group">
      <h4>{title}</h4>
      <div className="support-choice-grid">{children}</div>
    </div>
  );
}

function ChoiceButton({ item, selected, onClick }) {
  return (
    <button
      type="button"
      className={selected ? "support-choice-button is-selected" : "support-choice-button"}
      onClick={onClick}
      aria-pressed={selected}
    >
      <IconSymbol item={item} />
      <strong>{item.label}</strong>
    </button>
  );
}
