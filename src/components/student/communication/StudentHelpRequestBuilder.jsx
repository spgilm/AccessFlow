/**
 * StudentHelpRequestBuilder
 *
 * Builds a specific help request: help topic + requested staff response.
 */
import { useState } from "react";
import IconSymbol from "../../shared/IconSymbol.jsx";

export default function StudentHelpRequestBuilder({ selfAdvocacySupportSettings, onSupportRequest }) {
  const [topic, setTopic] = useState(null);
  const [action, setAction] = useState(null);

  const topics = selfAdvocacySupportSettings?.helpTopics ?? [];
  const actions = selfAdvocacySupportSettings?.helpActions ?? [];

  function record(nextTopic = topic, nextAction = action) {
    if (!nextTopic && !nextAction) {
      return;
    }

    const label = [
      "Help request:",
      nextTopic ? `with ${nextTopic.label}` : "",
      nextAction ? `please ${nextAction.label.toLowerCase()}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    onSupportRequest?.({
      type: "help-request-builder",
      label,
      activityId: null,
      activityLabel: null,
    });
  }

  return (
    <section className="student-communication-panel self-advocacy-panel help-request-panel" aria-labelledby="help-request-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Help</p>
          <h3 id="help-request-heading">I need help</h3>
        </div>
        <button
          type="button"
          className="secondary-button"
          disabled={!topic && !action}
          onClick={() => record()}
        >
          Tell staff
        </button>
      </div>

      <div className="support-builder-summary" aria-live="polite">
        <strong>Request:</strong>{" "}
        {[topic ? `with ${topic.label}` : "", action?.label].filter(Boolean).join(" · ") || "Choose what help you need"}
      </div>

      <ChoiceGroup title="Help with...">
        {topics.map((item) => (
          <ChoiceButton
            key={item.id}
            item={item}
            selected={topic?.id === item.id}
            onClick={() => {
              setTopic(item);
              record(item, action);
            }}
          />
        ))}
      </ChoiceGroup>

      <ChoiceGroup title="Help me by...">
        {actions.map((item) => (
          <ChoiceButton
            key={item.id}
            item={item}
            selected={action?.id === item.id}
            onClick={() => {
              setAction(item);
              record(topic, item);
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
      aria-label={item.label}
    >
      <IconSymbol item={item} />
      <strong>{item.label}</strong>
    </button>
  );
}
