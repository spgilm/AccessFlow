/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import EmojiPickerButton from "../../shared/EmojiPickerButton.jsx";

export default function StudentActivityDetail({
  activity,
  onClose,
  onToggleStep,
  onToggleActivityComplete,
  onUpdateActivityVisual,
  onUpdateStepVisual,
}) {
  if (!activity) {
    return (
      <section className="panel detail-panel empty-detail" aria-label="Activity details">
        <p>Select an activity to see smaller steps.</p>
      </section>
    );
  }

  const completeSteps = activity.steps.filter((step) => step.completed).length;
  const totalSteps = activity.steps.length;

  return (
    <section className="panel detail-panel" aria-labelledby="detail-heading">
      <div className="detail-header">
        <div className="detail-title-group">
          <EmojiPickerButton
            visual={activity.visual ?? activity.emoji}
            displayVisual={activity.completed ? "✅" : undefined}
            label={activity.label}
            className="detail-visual-picker"
            onChange={(visual) => onUpdateActivityVisual?.(activity.id, visual)}
          />
          <div>
            <p className="eyebrow">Task breakdown</p>
            <h2 id="detail-heading">{activity.label}</h2>
          </div>
        </div>

        <button className="icon-button" type="button" onClick={onClose} aria-label="Close task details">
          ×
        </button>
      </div>

      <p className="detail-summary">{activity.summary}</p>

      <div className="step-progress" aria-live="polite">
        {completeSteps} of {totalSteps} steps complete
      </div>

      <ol className="step-list">
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

      <button
        className="primary-wide-button"
        type="button"
        onClick={() => onToggleActivityComplete(activity.id)}
      >
        {activity.completed ? "Mark activity not complete" : "Mark whole activity done"}
      </button>
    </section>
  );
}
