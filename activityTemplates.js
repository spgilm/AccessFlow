import { createId } from "../utils/formatters.js";

export default function StaffActivityEditor({
  activity,
  onUpdateActivity,
  onUpdateStep,
  onAddStep,
  onDeleteStep,
  onMoveStep,
  onDeleteActivity,
}) {
  if (!activity) {
    return (
      <section className="panel staff-editor-panel" aria-labelledby="editor-empty-heading">
        <p className="eyebrow">Editor</p>
        <h2 id="editor-empty-heading">Select an activity</h2>
        <p className="field-help">Choose an activity from the list to edit its label, emoji, summary, and steps.</p>
      </section>
    );
  }

  function handleActivityFieldChange(field, value) {
    if (field === "emoji") {
      onUpdateActivity(activity.id, {
        visual: {
          ...activity.visual,
          value: value || "⭐",
          altText: `${activity.label} visual`,
        },
      });
      return;
    }

    onUpdateActivity(activity.id, { [field]: value });
  }

  function handleAddStep() {
    onAddStep(activity.id, {
      id: createId("step"),
      label: "New step",
      visual: {
        type: "emoji",
        value: "⭐",
        altText: "New step visual",
      },
      completed: false,
    });
  }

  return (
    <section className="panel staff-editor-panel" aria-labelledby="activity-editor-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Editor</p>
          <h2 id="activity-editor-heading">Edit activity</h2>
        </div>
      </div>

      <div className="editor-grid">
        <label>
          Activity label
          <input
            type="text"
            value={activity.label}
            onChange={(event) => handleActivityFieldChange("label", event.target.value)}
          />
        </label>

        <label>
          Emoji
          <input
            type="text"
            value={activity.visual.value}
            maxLength={4}
            onChange={(event) => handleActivityFieldChange("emoji", event.target.value)}
          />
        </label>

        <label className="full-width">
          Summary
          <textarea
            value={activity.summary}
            rows="3"
            onChange={(event) => handleActivityFieldChange("summary", event.target.value)}
          />
        </label>
      </div>

      <div className="editor-subheader">
        <div>
          <p className="eyebrow">Task analysis</p>
          <h3>Steps</h3>
        </div>
        <button type="button" className="secondary-button" onClick={handleAddStep}>
          Add step
        </button>
      </div>

      {activity.steps.length === 0 ? (
        <p className="field-help">No steps yet. Add at least one step for Student Mode.</p>
      ) : (
        <ol className="staff-step-editor-list">
          {activity.steps.map((step, index) => (
            <li key={step.id} className="staff-step-editor-row">
              <div className="step-edit-grid">
                <label>
                  Step {index + 1} emoji
                  <input
                    type="text"
                    value={step.visual.value}
                    maxLength={4}
                    onChange={(event) =>
                      onUpdateStep(activity.id, step.id, {
                        visual: {
                          ...step.visual,
                          value: event.target.value || "⭐",
                          altText: `${step.label} visual`,
                        },
                      })
                    }
                  />
                </label>

                <label>
                  Step label
                  <input
                    type="text"
                    value={step.label}
                    onChange={(event) =>
                      onUpdateStep(activity.id, step.id, {
                        label: event.target.value,
                        visual: {
                          ...step.visual,
                          altText: `${event.target.value} visual`,
                        },
                      })
                    }
                  />
                </label>
              </div>

              <div className="row-actions step-actions" aria-label={`Actions for step ${index + 1}`}>
                <button
                  type="button"
                  onClick={() => onMoveStep(activity.id, step.id, "up")}
                  disabled={index === 0}
                >
                  Up
                </button>
                <button
                  type="button"
                  onClick={() => onMoveStep(activity.id, step.id, "down")}
                  disabled={index === activity.steps.length - 1}
                >
                  Down
                </button>
                <button
                  type="button"
                  className="small-danger-button"
                  onClick={() => onDeleteStep(activity.id, step.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}

      <button
        type="button"
        className="danger-wide-button"
        onClick={() => onDeleteActivity(activity.id)}
      >
        Delete activity
      </button>
    </section>
  );
}
