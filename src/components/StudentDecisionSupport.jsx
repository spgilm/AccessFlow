import IconSymbol from "./IconSymbol.jsx";

/**
 * StudentDecisionSupport
 *
 * Simple two-choice/three-choice decision support. This is a student-facing
 * scaffold for communicating a preference, not a staff-forced choice.
 */
import { useState } from "react";

export default function StudentDecisionSupport({ selfAdvocacySupportSettings, onSupportRequest }) {
  const choices = selfAdvocacySupportSettings?.decisionChoices ?? [];
  const [choiceCount, setChoiceCount] = useState(2);

  const visibleChoices = choices.slice(0, choiceCount);

  function recordChoice(item) {
    onSupportRequest?.({
      type: "decision-choice",
      label: `Decision choice: ${item.label}`,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel self-advocacy-panel decision-support-panel" aria-labelledby="decision-support-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Choose</p>
          <h3 id="decision-support-heading">Help me choose</h3>
        </div>
        <div className="mini-toggle inline-mini-toggle" role="group" aria-label="Number of choices">
          <button
            type="button"
            className={choiceCount === 2 ? "is-active" : ""}
            onClick={() => setChoiceCount(2)}
            aria-pressed={choiceCount === 2}
          >
            2
          </button>
          <button
            type="button"
            className={choiceCount === 3 ? "is-active" : ""}
            onClick={() => setChoiceCount(3)}
            aria-pressed={choiceCount === 3}
          >
            3
          </button>
        </div>
      </div>

      <div className={choiceCount === 2 ? "support-choice-grid two-choice-grid" : "support-choice-grid"}>
        {visibleChoices.map((item) => (
          <button
            key={item.id}
            type="button"
            className="support-choice-button"
            onClick={() => recordChoice(item)}
          >
            <IconSymbol item={item} />
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
