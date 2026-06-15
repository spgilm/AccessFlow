/**
 * Staff-facing review queue for student-created tasks that need approval/editing.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
export default function ReviewQueuePanel({
  activities,
  onSelectActivity,
  onSaveActivityToBank,
  onDismissReview,
}) {
  const pending = activities.filter((activity) => activity.pendingReview);

  return (
    <section className="panel review-panel" aria-labelledby="review-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Review</p>
          <h2 id="review-heading">Student-created tasks</h2>
        </div>
      </div>

      {pending.length === 0 ? (
        <p className="field-help">No student-created tasks are waiting for review.</p>
      ) : (
        <div className="review-list">
          {pending.map((activity) => (
            <article key={activity.id} className="review-card">
              <div>
                <h3>{activity.label}</h3>
                <p>{activity.steps.length} steps created by student.</p>
              </div>
              <div className="row-actions">
                <button type="button" className="secondary-button" onClick={() => onSelectActivity(activity.id)}>
                  Edit
                </button>
                <button type="button" className="secondary-button" onClick={() => onSaveActivityToBank(activity.id)}>
                  Save to Choices
                </button>
                <button type="button" className="small-danger-button" onClick={() => onDismissReview(activity.id)}>
                  Dismiss
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
