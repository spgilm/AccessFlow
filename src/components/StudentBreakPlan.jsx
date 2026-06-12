/**
 * Student-facing structured break routine with break type, duration, event logging, and timer support.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useState } from "react";
import TimerButton from "./TimerButton.jsx";

/**
 * StudentBreakPlan turns "I need a break" into a structured regulation routine.
 *
 * The plan starts collapsed so Student Mode remains visually calm. Opening the plan
 * reveals break type choices, duration choices, a Start Break event logger, and a timer.
 */
const breakTypes = [
  { id: "quiet", label: "Quiet", emoji: "🤫" },
  { id: "walk", label: "Walk", emoji: "🚶" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "breathing", label: "Breathing", emoji: "🌬️" },
  { id: "water", label: "Water", emoji: "💧" },
  { id: "sensory", label: "Sensory item", emoji: "🧸" },
];

const durations = [2, 5, 10];

export default function StudentBreakPlan({ currentActivity, onSupportRequest }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBreak, setSelectedBreak] = useState(breakTypes[0]);
  const [selectedMinutes, setSelectedMinutes] = useState(5);
  const [timerStartSignal, setTimerStartSignal] = useState(0);
  const [activeBreakMessage, setActiveBreakMessage] = useState("");

  function startBreak() {
    onSupportRequest({
      type: "break-plan",
      label: `${selectedBreak.label} break for ${selectedMinutes} minutes`,
      activityId: currentActivity?.id ?? null,
      activityLabel: currentActivity?.label ?? null,
    });

    setTimerStartSignal((current) => current + 1);
    setActiveBreakMessage(`${selectedBreak.label} break started for ${selectedMinutes} minutes.`);
  }

  return (
    <section className="panel break-plan-panel" aria-labelledby="break-plan-heading">
      <button
        type="button"
        className="break-plan-toggle"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <span aria-hidden="true">🧘</span>
        <span>
          <strong id="break-plan-heading">Break plan</strong>
          <small>{isOpen ? "Close break choices" : "Open break choices"}</small>
        </span>
      </button>

      {isOpen ? (
        <div className="break-plan-body">
          <div className="break-choice-grid">
            {breakTypes.map((breakType) => (
              <button
                key={breakType.id}
                type="button"
                className={selectedBreak.id === breakType.id ? "is-selected" : ""}
                onClick={() => setSelectedBreak(breakType)}
                aria-pressed={selectedBreak.id === breakType.id}
              >
                <span aria-hidden="true">{breakType.emoji}</span>
                <strong>{breakType.label}</strong>
              </button>
            ))}
          </div>

          <div className="duration-grid" role="group" aria-label="Break duration">
            {durations.map((minutes) => (
              <button
                key={minutes}
                type="button"
                className={selectedMinutes === minutes ? "is-selected" : ""}
                onClick={() => setSelectedMinutes(minutes)}
                aria-pressed={selectedMinutes === minutes}
              >
                {minutes} min
              </button>
            ))}
          </div>

          <button type="button" className="primary-wide-button" onClick={startBreak}>
            Start break
          </button>

          {activeBreakMessage ? (
            <p className="copy-status" role="status">
              {activeBreakMessage}
            </p>
          ) : null}

          <TimerButton
            minutes={selectedMinutes}
            label={`${selectedBreak.label} break`}
            startSignal={timerStartSignal}
          />

          <p className="field-help">When the break is done, return to the schedule.</p>
        </div>
      ) : null}
    </section>
  );
}
