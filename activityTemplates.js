import VisualSupport from "./VisualSupport.jsx";

export default function StudentInlineSteps({ activity, onToggleStep }) {
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

      {activity.summary ? (
        <p className="inline-steps-summary">{activity.summary}</p>
      ) : null}

      <ol className="step-list inline-step-list">
        {activity.steps.map((step, index) => (
          <li key={step.id} className={`step-item ${step.completed ? "is-complete" : ""}`}>
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
              <span className="step-number">{index + 1}</span>
              <VisualSupport visual={step.visual ?? step.emoji} className="step-visual" />
              <span className="step-label">{step.label}</span>
              <span className="step-state">{step.completed ? "Done" : "Tap"}</span>
            </button>
          </li>
        ))}
      </ol>

      <p className="inline-steps-help">
        When all steps are done, this activity folds back into the schedule.
      </p>
    </div>
  );
}
