/**
 * StudentActivityReflectionPanel
 *
 * Student-facing activity reflection: difficulty + what helped.
 */
import { useState } from "react";
import IconSymbol from "./IconSymbol.jsx";

const difficultyOptions = [
  { id: "easy", label: "Easy", emoji: "🙂", icon: "happy" },
  { id: "okay", label: "Okay", emoji: "😐", icon: "okay" },
  { id: "hard", label: "Hard", emoji: "😟", icon: "question" },
  { id: "too-hard", label: "Too hard", emoji: "🧱", icon: "circle-exclamation" },
];

const helpedOptions = [
  { id: "timer", label: "Timer", emoji: "⏱️", icon: "clock" },
  { id: "break", label: "Break", emoji: "🧘", icon: "pause" },
  { id: "help", label: "Staff help", emoji: "🙋", icon: "help" },
  { id: "quiet", label: "Quiet", emoji: "🤫", icon: "quiet" },
  { id: "first-step", label: "First step", emoji: "1️⃣", icon: "eye" },
  { id: "choice", label: "Choice", emoji: "🧩", icon: "comment" },
];

export default function StudentActivityReflectionPanel({ currentActivity, onSupportRequest }) {
  const [difficulty, setDifficulty] = useState(null);
  const [helped, setHelped] = useState(null);

  if (!currentActivity) {
    return null;
  }

  function record(nextDifficulty = difficulty, nextHelped = helped) {
    if (!nextDifficulty && !nextHelped) {
      return;
    }

    onSupportRequest?.({
      type: "activity-reflection",
      label: [
        "Activity reflection:",
        currentActivity.label,
        nextDifficulty ? `felt ${nextDifficulty.label}` : "",
        nextHelped ? `helped by ${nextHelped.label}` : "",
      ].filter(Boolean).join(" "),
      activityId: currentActivity.id,
      activityLabel: currentActivity.label,
    });
  }

  return (
    <section className="student-communication-panel activity-readiness-panel" aria-labelledby="activity-reflection-heading">
      <div>
        <p className="eyebrow">Reflect</p>
        <h3 id="activity-reflection-heading">How was {currentActivity.label}?</h3>
      </div>

      <div className="support-choice-group">
        <h4>How did it feel?</h4>
        <div className="support-choice-grid">
          {difficultyOptions.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className={difficulty?.id === choice.id ? "support-choice-button is-selected" : "support-choice-button"}
              aria-label={choice.label}
              onClick={() => {
                setDifficulty(choice);
                record(choice, helped);
              }}
              aria-pressed={difficulty?.id === choice.id}
            >
              <IconSymbol item={choice} />
              <strong>{choice.label}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="support-choice-group">
        <h4>What helped?</h4>
        <div className="support-choice-grid">
          {helpedOptions.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className={helped?.id === choice.id ? "support-choice-button is-selected" : "support-choice-button"}
              aria-label={choice.label}
              onClick={() => {
                setHelped(choice);
                record(difficulty, choice);
              }}
              aria-pressed={helped?.id === choice.id}
            >
              <IconSymbol item={choice} />
              <strong>{choice.label}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
