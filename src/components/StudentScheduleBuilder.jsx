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
      <section className="panel student-builder-panel" aria-labelledby="builder-disabled-heading">
        <div className="empty-visual" aria-hidden="true">
          🧭
        </div>
        <h2 id="builder-disabled-heading">Staff-built schedule</h2>
        <p>
          This profile is set to use schedules prepared by staff. Staff can turn on student schedule building from Staff Mode.
        </p>
      </section>
    );
  }

  return (
    <section className="panel student-builder-panel" aria-labelledby="student-builder-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Add to my schedule</p>
          <h2 id="student-builder-heading">Choose from my activity bank</h2>
        </div>
      </div>

      <p className="builder-intro">
        Pick an approved activity card to add it to {profile?.name ? `${profile.name}'s` : "your"} schedule. Staff controls which choices appear here.
      </p>

      <div className="library-panel" aria-labelledby="activity-library-heading">
        <h3 id="activity-library-heading">My choices</h3>

        {!hasChoices ? (
          <div className="empty-bank-message">
            <div className="empty-visual" aria-hidden="true">🏦</div>
            <p>No activity choices are available yet.</p>
            <p className="field-help">
              Staff can add choices to this student's activity bank from Staff Mode.
            </p>
          </div>
        ) : (
          <div className="library-grid">
            {libraryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="library-card"
                onClick={() => onAddActivity({ type: "bank", choiceId: item.id })}
                aria-label={`Add ${item.label} to schedule`}
              >
                <VisualSupport
                  visual={item.visual ?? item.emoji}
                  className="library-visual"
                />
                <span className="library-label">{item.label}</span>
                <span className="library-summary">{item.summary}</span>
                <span className="library-step-count">{item.steps.length} steps</span>
              </button>
            ))}
          </div>
        )}

        {canAddCustom ? (
          <form className="student-custom-form" onSubmit={handleCustomSubmit}>
            <label>
              Request or add my own activity
              <div className="inline-control-row">
                <input
                  type="text"
                  value={customTask}
                  placeholder="Example: take a movement break"
                  onChange={(event) => setCustomTask(event.target.value)}
                />
                <button type="submit">Add</button>
              </div>
            </label>
            <p className="field-help">
              Custom activities use simple generated steps. Staff can edit and save them to the bank later.
            </p>
          </form>
        ) : null}
      </div>
    </section>
  );
}
