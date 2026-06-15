/**
 * Staff-facing builder for adding a simple First/Then sequence from the student's choice bank.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
export default function FirstThenBoardManager({
  activityBank,
  firstThenBoard,
  onUpdateFirstThenBoard,
  onAddFirstThenToSchedule,
}) {
  return (
    <section className="panel first-then-builder-panel" aria-labelledby="first-then-builder-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">First / Then</p>
          <h2 id="first-then-builder-heading">Build first / then board</h2>
        </div>
      </div>

      <div className="first-then-builder-grid">
        <label>
          First
          <select
            value={firstThenBoard?.firstChoiceId ?? ""}
            onChange={(event) =>
              onUpdateFirstThenBoard({
                ...(firstThenBoard ?? {}),
                firstChoiceId: event.target.value,
              })
            }
          >
            <option value="">Choose first...</option>
            {activityBank.map((choice) => (
              <option key={choice.id} value={choice.id}>
                {choice.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Then
          <select
            value={firstThenBoard?.thenChoiceId ?? ""}
            onChange={(event) =>
              onUpdateFirstThenBoard({
                ...(firstThenBoard ?? {}),
                thenChoiceId: event.target.value,
              })
            }
          >
            <option value="">Choose then...</option>
            {activityBank.map((choice) => (
              <option key={choice.id} value={choice.id}>
                {choice.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        className="primary-wide-button"
        onClick={onAddFirstThenToSchedule}
        disabled={!firstThenBoard?.firstChoiceId && !firstThenBoard?.thenChoiceId}
      >
        Add first / then to schedule
      </button>
    </section>
  );
}
