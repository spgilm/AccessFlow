import { useState } from "react";
import { createId } from "../utils/formatters.js";
import VisualEditor from "./VisualEditor.jsx";

export default function StaffActivityEditor({
  activity,
  onUpdateActivity,
  onUpdateStep,
  onAddStep,
  onDeleteStep,
  onMoveStep,
  onSaveActivityToBank,
  onDeleteActivity,
}) {
  const [visualError, setVisualError] = useState("");

  if (!activity) {
    return (
      <section className="panel staff-editor-panel" aria-labelledby="editor-empty-heading">
        <p className="eyebrow">Editor</p>
        <h2 id="editor-empty-heading">Select an activity</h2>
        <p className="field-help">Choose an activity from the list to edit its label, visual, summary, and steps.</p>
      </section>
    );
  }

  function handleActivityFieldChange(field, value) {
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

        {onSaveActivityToBank ? (
          <button
            type="button"
            className="secondary-button save-choice-button"
            onClick={() => onSaveActivityToBank(activity.id)}
          >
            Save to Student Choices
          </button>
        ) : null}
      </div>

      {visualError ? (
        <p className="form-error" role="alert">
          {visualError}
        </p>
      ) : null}

      <div className="editor-grid">
        <label>
          Activity label
          <input
            type="text"
            value={activity.label}
            onChange={(event) => handleActivityFieldChange("label", event.target.value)}
          />
        </label>

        <VisualEditor
          label="Activity visual"
          visual={activity.visual}
          fallbackLabel={activity.label}
          onError={setVisualError}
          onChange={(visual) => onUpdateActivity(activity.id, { visual })}
        />

        <label className="full-width">
          Summary
          <textarea
            value={activity.summary}
            rows="3"
            onChange={(event) => handleActivityFieldChange("summary", event.target.value)}
          />
        </label>
      </div>

      <p className="field-help editor-note">
        Uploaded images are stored only in this browser for now. Use small images under 900 KB.
      </p>

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
                <VisualEditor
                  label={`Step ${index + 1} visual`}
                  visual={step.visual}
                  fallbackLabel={step.label}
                  onError={setVisualError}
                  onChange={(visual) => onUpdateStep(activity.id, step.id, { visual })}
                />

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
