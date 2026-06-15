import IconSymbol from "../../shared/IconSymbol.jsx";

/**
 * StudentPainBodyPanel
 *
 * Student/client-facing pain and body communication support.
 */
import { useState } from "react";

export default function StudentPainBodyPanel({ communicationSupportSettings, onSupportRequest }) {
  const [bodyPart, setBodyPart] = useState(null);
  const [descriptor, setDescriptor] = useState(null);
  const [level, setLevel] = useState(null);

  const bodyParts = communicationSupportSettings?.painBodyParts ?? [];
  const descriptors = communicationSupportSettings?.painDescriptors ?? [];
  const levels = communicationSupportSettings?.painLevels ?? [];

  function submitPainMessage(nextPart = bodyPart, nextDescriptor = descriptor, nextLevel = level) {
    if (!nextPart && !nextDescriptor && !nextLevel) {
      return;
    }

    const label = [
      "Pain/body message:",
      nextPart?.label,
      nextDescriptor?.label,
      nextLevel ? `level ${nextLevel.label}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    onSupportRequest?.({
      type: "pain-body-message",
      label,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel pain-body-panel" aria-labelledby="pain-body-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Body</p>
          <h3 id="pain-body-heading">Tell someone what hurts</h3>
        </div>
        <button
          type="button"
          className="secondary-button"
          onClick={() => submitPainMessage()}
          disabled={!bodyPart && !descriptor && !level}
        >
          Tell staff
        </button>
      </div>

      <div className="support-builder-summary" aria-live="polite">
        <strong>Message:</strong>{" "}
        {[bodyPart?.label, descriptor?.label, level?.label].filter(Boolean).join(" · ") || "Choose what to say"}
      </div>

      <SupportChoiceGroup title="Where?">
        {bodyParts.map((item) => (
          <SupportChoiceButton
            key={item.id}
            item={item}
            selected={bodyPart?.id === item.id}
            onClick={() => {
              setBodyPart(item);
              submitPainMessage(item, descriptor, level);
            }}
          />
        ))}
      </SupportChoiceGroup>

      <SupportChoiceGroup title="What does it feel like?">
        {descriptors.map((item) => (
          <SupportChoiceButton
            key={item.id}
            item={item}
            selected={descriptor?.id === item.id}
            onClick={() => {
              setDescriptor(item);
              submitPainMessage(bodyPart, item, level);
            }}
          />
        ))}
      </SupportChoiceGroup>

      <SupportChoiceGroup title="How much?">
        {levels.map((item) => (
          <SupportChoiceButton
            key={item.id}
            item={item}
            selected={level?.id === item.id}
            onClick={() => {
              setLevel(item);
              submitPainMessage(bodyPart, descriptor, item);
            }}
          />
        ))}
      </SupportChoiceGroup>
    </section>
  );
}

function SupportChoiceGroup({ title, children }) {
  return (
    <div className="support-choice-group">
      <h4>{title}</h4>
      <div className="support-choice-grid">{children}</div>
    </div>
  );
}

function SupportChoiceButton({ item, selected, onClick }) {
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
