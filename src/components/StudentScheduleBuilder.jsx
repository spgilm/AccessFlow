import { useState } from "react";
import VisualSupport from "./VisualSupport.jsx";

export default function StudentScheduleBuilder({
  profile,
  libraryItems,
  independenceSettings,
  onAddActivity,
}) {
  const [customTask, setCustomTask] = useState("");
  const [customSteps, setCustomSteps] = useState(["", ""]);

  const canBuild = independenceSettings.studentCanBuildSchedule;
  const canAddCustom = independenceSettings.studentCanAddCustomActivities;
  const hasChoices = libraryItems.length > 0;

  function updateCustomStep(index, value) {
    setCustomSteps((currentSteps) =>
      currentSteps.map((step, stepIndex) => (stepIndex === index ? value : step))
    );
  }

  function addCustomStep() {
    setCustomSteps((currentSteps) => [...currentSteps, ""]);
  }

  function removeCustomStep(index) {
    setCustomSteps((currentSteps) =>
      currentSteps.filter((_, stepIndex) => stepIndex !== index)
    );
  }

  function handleCustomSubmit(event) {
    event.preventDefault();

    const trimmed = customTask.trim();
    const stepLabels = customSteps.map((step) => step.trim()).filter(Boolean);

    if (!trimmed) {
      return;
    }

    onAddActivity({
      type: "custom",
      taskText: trimmed,
      stepLabels,
    });
    setCustomTask("");
    setCustomSteps(["", ""]);
  }

  if (!canBuild) {
    return (
      <section className="panel student-builder-panel simple-student-panel" aria-labelledby="builder-disabled-heading">
        <div className="empty-visual" aria-hidden="true">
          🧭
        </div>
        <h2 id="builder-disabled-heading">Staff made this schedule.</h2>
        <p>Ask staff to change the choices.</p>
      </section>
    );
  }

  return (
    <section className="panel student-builder-panel simple-student-panel" aria-labelledby="student-builder-heading">
      <div className="simple-section-title">
        <p className="eyebrow">My choices</p>
        <h2 id="student-builder-heading">Choose an activity</h2>
      </div>

      {!hasChoices ? (
        <div className="empty-bank-message student-empty-bank">
          <div className="empty-visual" aria-hidden="true">➕</div>
          <p>No choices yet.</p>
          <p className="field-help">
            Staff can add choices.
          </p>
        </div>
      ) : (
        <div className="library-grid simplified-choice-grid">
          {libraryItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="library-card simplified-choice-card"
              onClick={() => onAddActivity({ type: "bank", choiceId: item.id })}
              aria-label={`Add ${item.label} to schedule`}
            >
              <VisualSupport
                visual={item.visual ?? item.emoji}
                className="library-visual simplified-choice-visual"
              />
              <span className="library-label">{item.label}</span>
              <span className="library-step-count">Add</span>
            </button>
          ))}
        </div>
      )}

      {canAddCustom ? (
        <form className="student-custom-form simplified-custom-form student-step-builder" onSubmit={handleCustomSubmit}>
          <div className="simple-section-title">
            <p className="eyebrow">Make my own</p>
            <h2>Add an activity and steps</h2>
          </div>

          <label>
            Activity
            <input
              type="text"
              value={customTask}
              placeholder="Example: make a snack"
              onChange={(event) => setCustomTask(event.target.value)}
            />
          </label>

          <div className="student-made-steps" aria-label="Student-created smaller steps">
            <div className="section-heading-row compact-heading-row">
              <h3>Smaller steps</h3>
              <button type="button" className="secondary-button" onClick={addCustomStep}>
                Add step
              </button>
            </div>

            {customSteps.map((step, index) => (
              <div key={`custom-step-${index}`} className="student-made-step-row">
                <span className="step-number">{index + 1}</span>
                <input
                  type="text"
                  value={step}
                  placeholder={`Step ${index + 1}`}
                  onChange={(event) => updateCustomStep(index, event.target.value)}
                />
                {customSteps.length > 1 ? (
                  <button
                    type="button"
                    className="small-danger-button"
                    onClick={() => removeCustomStep(index)}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          <button type="submit" className="primary-wide-button">
            Add to my schedule
          </button>
          <p className="field-help">
            Staff can review this later and save it to Student Choices.
          </p>
        </form>
      ) : null}
    </section>
  );
}
