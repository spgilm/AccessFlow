import EmojiPickerButton from "./EmojiPickerButton.jsx";

export default function StudentInlineSteps({ activity, onToggleStep, onUpdateStepVisual }) {
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
              <span className="step-number">{index + 1}</span>
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
          </li>
        ))}
      </ol>

      <p className="inline-steps-help">
        Finish all steps to close this card.
      </p>
    </div>
  );
}
