/**
 * Student-facing task-analysis step list with completion, prompt tracking, timers, and icon editing.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import EmojiPickerButton from "../../shared/EmojiPickerButton.jsx";
import TimerButton from "../../shared/TimerButton.jsx";

const promptOptions = [
  "Independent",
  "Verbal prompt",
  "Gesture prompt",
  "Model prompt",
  "Physical assistance",
  "Refused",
  "Skipped",
];

export default function StudentInlineSteps({
  activity,
  onToggleStep,
  onUpdateStepVisual,
  onUpdateStepPrompt,
  showPromptControls = true,
  showStepNumbers = true,
  showTimers = true,
}) {
  if (!activity) {
    return null;
  }

  const completeSteps = activity.steps.filter((step) => step.completed).length;
  const totalSteps = activity.steps.length;

  return (
    <div
      className="inline-steps-panel"
      aria-label={`${activity.label} smaller steps`}
    >
      <div className="inline-steps-header">
        <div>
          <p className="eyebrow">Smaller steps</p>
          <h3>{activity.label}</h3>
        </div>
        <span className="step-progress inline-step-progress" aria-live="polite">
          {completeSteps} of {totalSteps}
        </span>
      </div>

      <ol className="step-list inline-step-list">
        {activity.steps.map((step, index) => (
          <li key={step.id} className={`step-item ${step.completed ? "is-complete" : ""}`}>
            <div className="inline-step-row">
              {showStepNumbers ? <span className="step-number">{index + 1}</span> : null}
              <EmojiPickerButton
                visual={step.visual ?? step.emoji}
                displayVisual={step.completed ? "✅" : undefined}
                label={step.label}
                className="step-visual-picker"
                onChange={(visual) => onUpdateStepVisual?.(activity.id, step.id, visual)}
              />
              <button
                type="button"
                className="step-button"
                onClick={() => onToggleStep(activity.id, step.id)}
                aria-label={
                  step.completed
                    ? `Mark step ${index + 1}, ${step.label}, as not complete`
                    : `Mark step ${index + 1}, ${step.label}, as complete`
                }
              >
                <span className="step-label">{step.label}</span>
                <span className="step-state">{step.completed ? "Done" : "Tap"}</span>
              </button>
            </div>

            {showTimers && step.timerMinutes ? (
              <TimerButton minutes={step.timerMinutes} label={step.label} />
            ) : null}

            {showPromptControls ? (
              <label className="prompt-select-label">
                Support used
                <select
                  value={step.promptLevel ?? ""}
                  onChange={(event) => onUpdateStepPrompt?.(activity.id, step.id, event.target.value)}
                >
                  <option value="">Not recorded</option>
                  {promptOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </li>
        ))}
      </ol>

      <p className="inline-steps-help">
        Finish all steps to close this card.
      </p>
    </div>
  );
}
