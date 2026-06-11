import { useState } from "react";
import VisualSupport from "./VisualSupport.jsx";
import { createEmojiVisual } from "../services/imageProvider.js";

export default function StudentScheduleBuilder({
  profile,
  activities,
  libraryItems,
  independenceSettings,
  onAddActivity,
  onMoveActivity,
  onRemoveActivity,
  onClearSchedule,
  onSelectActivity,
}) {
  const [customTask, setCustomTask] = useState("");

  const canBuild = independenceSettings.studentCanBuildSchedule;
  const canReorder = independenceSettings.studentCanReorderSchedule;
  const canAddCustom = independenceSettings.studentCanAddCustomActivities;
  const canRemove = independenceSettings.studentCanRemoveActivities;
  const canClear = independenceSettings.studentCanClearSchedule;

  function handleCustomSubmit(event) {
    event.preventDefault();

    const trimmed = customTask.trim();
    if (!trimmed) {
      return;
    }

    onAddActivity(trimmed);
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
          <p className="eyebrow">Student independence</p>
          <h2 id="student-builder-heading">Plan my day</h2>
        </div>
      </div>

      <p className="builder-intro">
        Choose activities to add to {profile?.name ? `${profile.name}'s` : "your"} schedule. Staff controls which independence options are available.
      </p>

      <div className="builder-grid">
        <div className="library-panel" aria-labelledby="activity-library-heading">
          <h3 id="activity-library-heading">Choose an activity</h3>
          <div className="library-grid">
            {libraryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="library-card"
                onClick={() => onAddActivity(item.taskText)}
                aria-label={`Add ${item.label} to schedule`}
              >
                <VisualSupport
                  visual={createEmojiVisual(item.emoji, `${item.label} visual`)}
                  className="library-visual"
                />
                <span className="library-label">{item.label}</span>
                <span className="library-summary">{item.summary}</span>
              </button>
            ))}
          </div>

          {canAddCustom ? (
            <form className="student-custom-form" onSubmit={handleCustomSubmit}>
              <label>
                Add my own activity
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
                Custom activities use simple generated steps. Staff can edit the details later.
              </p>
            </form>
          ) : null}
        </div>

        <div className="student-plan-panel" aria-labelledby="student-plan-heading">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">My plan</p>
              <h3 id="student-plan-heading">Current schedule</h3>
            </div>
          </div>

          {activities.length === 0 ? (
            <p className="builder-empty">No activities yet. Choose one from the activity library.</p>
          ) : (
            <ol className="student-plan-list">
              {activities.map((activity, index) => (
                <li key={activity.id} className="student-plan-row">
                  <button
                    type="button"
                    className="student-plan-main"
                    onClick={() => onSelectActivity(activity.id)}
                    aria-label={`Open ${activity.label}`}
                  >
                    <span className="staff-row-number">{index + 1}</span>
                    <VisualSupport visual={activity.visual} className="staff-row-visual" />
                    <span className="student-plan-label">{activity.label}</span>
                  </button>

                  {canReorder || canRemove ? (
                    <div className="row-actions" aria-label={`Actions for ${activity.label}`}>
                      {canReorder ? (
                        <>
                          <button
                            type="button"
                            onClick={() => onMoveActivity(activity.id, "up")}
                            disabled={index === 0}
                          >
                            Up
                          </button>
                          <button
                            type="button"
                            onClick={() => onMoveActivity(activity.id, "down")}
                            disabled={index === activities.length - 1}
                          >
                            Down
                          </button>
                        </>
                      ) : null}

                      {canRemove ? (
                        <button
                          type="button"
                          className="small-danger-button"
                          onClick={() => onRemoveActivity(activity.id)}
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          )}

          {canClear && activities.length > 0 ? (
            <button type="button" className="danger-wide-button" onClick={onClearSchedule}>
              Start schedule over
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
