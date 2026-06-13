/**
 * Staff-facing progress goal manager.
 *
 * Goals link to an activity name and are summarized across the selected week.
 */
import { useMemo, useState } from "react";

export default function StaffGoalPanel({
  goals,
  activities,
  activityBank,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
}) {
  const [title, setTitle] = useState("");
  const [linkedActivityName, setLinkedActivityName] = useState("");
  const [targetDays, setTargetDays] = useState(4);
  const [targetPercent, setTargetPercent] = useState(80);
  const [notes, setNotes] = useState("");

  const activityOptions = useMemo(() => {
    const names = new Set([
      ...activities.map((activity) => activity.label),
      ...activityBank.map((activity) => activity.label),
    ]);

    return Array.from(names).filter(Boolean).sort((a, b) => a.localeCompare(b));
  }, [activities, activityBank]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddGoal({
      title: trimmedTitle,
      linkedActivityName,
      targetDays,
      targetPercent,
      notes,
    });

    setTitle("");
    setLinkedActivityName("");
    setTargetDays(4);
    setTargetPercent(80);
    setNotes("");
  }

  return (
    <section className="panel goal-panel" aria-labelledby="goal-panel-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Goals</p>
          <h2 id="goal-panel-heading">Progress goals</h2>
          <p className="field-help">
            Link goals to activity names so AccessFlow can summarize weekly completion.
          </p>
        </div>
      </div>

      <form className="goal-create-form" onSubmit={handleSubmit}>
        <label>
          Goal title
          <input
            type="text"
            value={title}
            placeholder="Example: Brush teeth with fewer prompts"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label>
          Linked activity
          <input
            type="text"
            value={linkedActivityName}
            list="goal-activity-options"
            placeholder="Example: Brush teeth"
            onChange={(event) => setLinkedActivityName(event.target.value)}
          />
          <datalist id="goal-activity-options">
            {activityOptions.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </label>

        <label>
          Target days per week
          <input
            type="number"
            min="0"
            max="7"
            value={targetDays}
            onChange={(event) => setTargetDays(Number(event.target.value))}
          />
        </label>

        <label>
          Target percent
          <input
            type="number"
            min="0"
            max="100"
            value={targetPercent}
            onChange={(event) => setTargetPercent(Number(event.target.value))}
          />
        </label>

        <label className="full-width">
          Goal notes
          <textarea
            rows="2"
            value={notes}
            placeholder="Example: Track completion with no more than verbal prompts."
            onChange={(event) => setNotes(event.target.value)}
          />
        </label>

        <button type="submit" className="primary-wide-button">
          Add goal
        </button>
      </form>

      {goals.length === 0 ? (
        <p className="field-help">No goals configured yet.</p>
      ) : (
        <div className="goal-list">
          {goals.map((goal) => (
            <article key={goal.id} className="goal-card">
              <label>
                Goal title
                <input
                  type="text"
                  value={goal.title}
                  onChange={(event) => onUpdateGoal(goal.id, { title: event.target.value })}
                />
              </label>

              <label>
                Linked activity
                <input
                  type="text"
                  value={goal.linkedActivityName}
                  list="goal-activity-options"
                  onChange={(event) =>
                    onUpdateGoal(goal.id, { linkedActivityName: event.target.value })
                  }
                />
              </label>

              <div className="goal-target-grid">
                <label>
                  Days
                  <input
                    type="number"
                    min="0"
                    max="7"
                    value={goal.targetDays}
                    onChange={(event) =>
                      onUpdateGoal(goal.id, { targetDays: Number(event.target.value) })
                    }
                  />
                </label>

                <label>
                  Percent
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={goal.targetPercent}
                    onChange={(event) =>
                      onUpdateGoal(goal.id, { targetPercent: Number(event.target.value) })
                    }
                  />
                </label>

                <label className="checkbox-row goal-active-checkbox">
                  <input
                    type="checkbox"
                    checked={goal.isActive !== false}
                    onChange={(event) => onUpdateGoal(goal.id, { isActive: event.target.checked })}
                  />
                  <span><strong>Active</strong></span>
                </label>
              </div>

              <label>
                Notes
                <textarea
                  rows="2"
                  value={goal.notes ?? ""}
                  onChange={(event) => onUpdateGoal(goal.id, { notes: event.target.value })}
                />
              </label>

              <button type="button" className="small-danger-button" onClick={() => onDeleteGoal(goal.id)}>
                Remove goal
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
