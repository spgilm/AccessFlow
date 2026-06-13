import IconSymbol from "./IconSymbol.jsx";

/**
 * StudentRegulationPathway
 *
 * Guided emotional-regulation path: feeling -> need -> ready check.
 */
import { useState } from "react";

export default function StudentRegulationPathway({ communicationSupportSettings, onSupportRequest }) {
  const [feeling, setFeeling] = useState(null);
  const [need, setNeed] = useState(null);

  const pathway = communicationSupportSettings?.regulationPathway ?? {};
  const feelings = pathway.feelings ?? [];
  const needs = pathway.needs ?? [];
  const readyOptions = pathway.readyOptions ?? [];

  function record(partial) {
    const nextFeeling = partial.feeling ?? feeling;
    const nextNeed = partial.need ?? need;
    const ready = partial.ready;

    const label = [
      "Regulation:",
      nextFeeling ? `feeling ${nextFeeling.label}` : "",
      nextNeed ? `needs ${nextNeed.label}` : "",
      ready ? `ready check ${ready.label}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    onSupportRequest?.({
      type: "regulation-pathway",
      label,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel regulation-pathway-panel" aria-labelledby="regulation-pathway-heading">
      <div>
        <p className="eyebrow">Feelings</p>
        <h3 id="regulation-pathway-heading">Help me get ready</h3>
      </div>

      <div className="support-builder-summary" aria-live="polite">
        <strong>Path:</strong>{" "}
        {[feeling?.label, need?.label].filter(Boolean).join(" → ") || "Choose how you feel"}
      </div>

      <div className="support-choice-group">
        <h4>I feel...</h4>
        <div className="support-choice-grid">
          {feelings.map((item) => (
            <ChoiceButton
              key={item.id}
              item={item}
              selected={feeling?.id === item.id}
              onClick={() => {
                setFeeling(item);
                record({ feeling: item });
              }}
            />
          ))}
        </div>
      </div>

      <div className="support-choice-group">
        <h4>I need...</h4>
        <div className="support-choice-grid">
          {needs.map((item) => (
            <ChoiceButton
              key={item.id}
              item={item}
              selected={need?.id === item.id}
              onClick={() => {
                setNeed(item);
                record({ need: item });
              }}
            />
          ))}
        </div>
      </div>

      <div className="support-choice-group">
        <h4>Ready?</h4>
        <div className="support-choice-grid two-choice-grid">
          {readyOptions.map((item) => (
            <ChoiceButton
              key={item.id}
              item={item}
              selected={false}
              onClick={() => record({ ready: item })}
            />
          ))}
        </div>
      </div>
    </section>
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
