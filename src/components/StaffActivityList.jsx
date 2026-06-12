import VisualSupport from "./VisualSupport.jsx";

export default function StaffActivityList({
  activities,
  selectedActivityId,
  onSelectActivity,
  onMoveActivity,
  onDeleteActivity,
}) {
  if (activities.length === 0) {
    return (
      <section className="panel empty-state" aria-labelledby="staff-empty-heading">
        <div className="empty-visual" aria-hidden="true">
          🧰
        </div>
        <h2 id="staff-empty-heading">No activities to edit</h2>
        <p>Add an activity above to start building the schedule.</p>
      </section>
    );
  }

  return (
    <section className="panel staff-list-panel" aria-labelledby="staff-list-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Schedule order</p>
          <h2 id="staff-list-heading">Activities</h2>
        </div>
      </div>

      <ol className="staff-activity-list">
        {activities.map((activity, index) => (
          <li
            key={activity.id}
            className={`staff-activity-row ${
              activity.id === selectedActivityId ? "is-selected" : ""
            }`}
          >
            <button
              type="button"
              className="staff-select-button"
              onClick={() => onSelectActivity(activity.id)}
              aria-pressed={activity.id === selectedActivityId}
            >
              <span className="staff-row-number">{index + 1}</span>
              <VisualSupport visual={activity.visual} className="staff-row-visual" />
              <span className="staff-row-label">{activity.label}</span>
            </button>

            <div className="row-actions" aria-label={`Actions for ${activity.label}`}>
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
              <button
                type="button"
                className="small-danger-button"
                onClick={() => onDeleteActivity(activity.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
