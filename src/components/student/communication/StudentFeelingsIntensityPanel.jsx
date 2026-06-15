/**
 * StudentFeelingsIntensityPanel
 *
 * Student-facing feelings + intensity scale.
 */
import { useState } from "react";
import IconSymbol from "../../shared/IconSymbol.jsx";

export default function StudentFeelingsIntensityPanel({ aacExpansionSettings, onSupportRequest }) {
  const feelings = aacExpansionSettings?.feelings ?? [];
  const intensityLevels = aacExpansionSettings?.intensityLevels ?? [];
  const [feeling, setFeeling] = useState(null);
  const [intensity, setIntensity] = useState(null);

  function record(nextFeeling = feeling, nextIntensity = intensity) {
    if (!nextFeeling && !nextIntensity) {
      return;
    }

    onSupportRequest?.({
      type: "aac-feeling",
      label: [
        "Feeling:",
        nextFeeling?.label ?? "",
        nextIntensity ? `intensity ${nextIntensity.label}` : "",
      ].filter(Boolean).join(" "),
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel aac-expansion-panel" aria-labelledby="feelings-intensity-heading">
      <div>
        <p className="eyebrow">Feelings</p>
        <h3 id="feelings-intensity-heading">How do I feel?</h3>
      </div>

      <div className="support-choice-group">
        <h4>Feeling</h4>
        <div className="support-choice-grid aac-grid">
          {feelings.map((item) => (
            <button
              key={item.id}
              type="button"
              className={feeling?.id === item.id ? "support-choice-button aac-choice-button is-selected" : "support-choice-button aac-choice-button"}
                  aria-label={item.label}
              onClick={() => {
                setFeeling(item);
                record(item, intensity);
              }}
              aria-pressed={feeling?.id === item.id}
            >
              <IconSymbol item={item} />
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="support-choice-group">
        <h4>How much?</h4>
        <div className="support-choice-grid aac-grid">
          {intensityLevels.map((item) => (
            <button
              key={item.id}
              type="button"
              className={intensity?.id === item.id ? "support-choice-button aac-choice-button is-selected" : "support-choice-button aac-choice-button"}
                  aria-label={item.label}
              onClick={() => {
                setIntensity(item);
                record(feeling, item);
              }}
              aria-pressed={intensity?.id === item.id}
            >
              <IconSymbol item={item} />
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
