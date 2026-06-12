import { useState } from "react";
import VisualSupport from "./VisualSupport.jsx";

export default function StudentScheduleBuilder({
  profile,
  libraryItems,
  independenceSettings,
  onAddActivity,
}) {
  const [customTask, setCustomTask] = useState("");

  const canBuild = independenceSettings.studentCanBuildSchedule;
  const canAddCustom = independenceSettings.studentCanAddCustomActivities;
  const hasChoices = libraryItems.length > 0;

  function handleCustomSubmit(event) {
    event.preventDefault();

    const trimmed = customTask.trim();
    if (!trimmed) {
      return;
    }

    onAddActivity({ type: "custom", taskText: trimmed });
    setCustomTask("");
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
        <form className="student-custom-form simplified-custom-form" onSubmit={handleCustomSubmit}>
          <label>
            Ask for another activity
            <div className="inline-control-row">
              <input
                type="text"
                value={customTask}
                placeholder="Type activity"
                onChange={(event) => setCustomTask(event.target.value)}
              />
              <button type="submit">Add</button>
            </div>
          </label>
        </form>
      ) : null}
    </section>
  );
}
