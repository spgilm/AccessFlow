import { useState } from "react";
import VisualSupport from "./VisualSupport.jsx";

export default function StaffChoiceBankPanel({
  selectedProfile,
  activities,
  activityBank,
  onAddChoiceToBank,
  onSaveActivityToBank,
  onAddBankChoiceToSchedule,
  onDeleteBankChoice,
}) {
  const [taskText, setTaskText] = useState("");
  const [selectedActivityId, setSelectedActivityId] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmed = taskText.trim();
    if (!trimmed) {
      return;
    }

    onAddChoiceToBank(trimmed);
    setTaskText("");
  }

  function handleSaveExisting(event) {
    event.preventDefault();

    if (!selectedActivityId) {
      return;
    }

    onSaveActivityToBank(selectedActivityId);
    setSelectedActivityId("");
  }

  return (
    <section className="panel staff-bank-panel" aria-labelledby="staff-bank-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Student choice bank</p>
          <h2 id="staff-bank-heading">Activity choices for {selectedProfile?.name ?? "this profile"}</h2>
        </div>
      </div>

      <p className="field-help">
        The student-facing choice bank starts blank. Add approved activities here first, then the student can choose from this bank to build their schedule.
      </p>

      <form className="bank-add-form" onSubmit={handleSubmit}>
        <label>
          Add a new bank choice
          <div className="inline-control-row">
            <input
              type="text"
              value={taskText}
              placeholder="Example: eat an orange"
              onChange={(event) => setTaskText(event.target.value)}
            />
            <button type="submit">Add to bank</button>
          </div>
        </label>
      </form>

      {activities.length > 0 ? (
        <form className="bank-add-form" onSubmit={handleSaveExisting}>
          <label>
            Save an existing scheduled activity to the bank
            <div className="inline-control-row">
              <select
                value={selectedActivityId}
                onChange={(event) => setSelectedActivityId(event.target.value)}
              >
                <option value="">Choose activity...</option>
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.label}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={!selectedActivityId}>
                Save choice
              </button>
            </div>
          </label>
        </form>
      ) : null}

      {activityBank.length === 0 ? (
        <div className="empty-bank-message">
          <div className="empty-visual" aria-hidden="true">🏦</div>
          <p>No bank choices yet.</p>
          <p className="field-help">
            Add choices such as “Brush Teeth,” “Eat an Orange,” or “Take a Break.”
          </p>
        </div>
      ) : (
        <div className="bank-choice-list">
          {activityBank.map((choice) => (
            <article key={choice.id} className="bank-choice-card">
              <div className="bank-choice-main">
                <VisualSupport visual={choice.visual ?? choice.emoji} className="bank-choice-visual" />
                <div>
                  <h3>{choice.label}</h3>
                  <p>{choice.summary}</p>
                  <span>{choice.steps.length} saved steps</span>
                </div>
              </div>

              <div className="row-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => onAddBankChoiceToSchedule(choice.id)}
                >
                  Add to schedule
                </button>
                <button
                  type="button"
                  className="small-danger-button"
                  onClick={() => onDeleteBankChoice(choice.id)}
                >
                  Remove from bank
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
