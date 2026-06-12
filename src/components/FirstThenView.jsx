import { getFirstThenActivities } from "../utils/activityHelpers.js";
import EmptyState from "./EmptyState.jsx";
import VisualSupport from "./VisualSupport.jsx";

function FirstThenCard({ label, activity, variant, onSelectActivity, onToggleActivityComplete }) {
  if (!activity) {
    return (
      <div className={`first-then-card ${variant}`}>
        <span className="first-then-label">{label}</span>
        <div className="first-then-empty">Finished for now</div>
      </div>
    );
  }

  return (
    <article className={`first-then-card ${variant}`}>
      <span className="first-then-label">{label}</span>
      <button
        type="button"
        className="first-then-main"
        onClick={() => onSelectActivity(activity.id)}
        aria-label={`Open ${label}: ${activity.label}`}
      >
        <VisualSupport
          visual={activity.completed ? "✅" : activity.visual}
          className="first-then-visual"
        />
        <span className="first-then-title">{activity.label}</span>
        <span className="first-then-summary">{activity.summary}</span>
      </button>
      {variant === "first" ? (
        <button
          type="button"
          className="primary-wide-button"
          onClick={() => onToggleActivityComplete(activity.id)}
        >
          {activity.completed ? "Undo" : "Done"}
        </button>
      ) : null}
    </article>
  );
}

export default function FirstThenView({
  activities,
  onSelectActivity,
  onToggleActivityComplete,
}) {
  if (activities.length === 0) {
    return <EmptyState />;
  }

  const { first, then, allDone } = getFirstThenActivities(activities);

  if (allDone) {
    return (
      <section className="panel first-then-complete" aria-labelledby="all-done-heading">
        <div className="first-then-done-icon" aria-hidden="true">✅</div>
        <h2 id="all-done-heading">All done</h2>
        <p>There are no more activities in today&apos;s schedule.</p>
      </section>
    );
  }

  return (
    <section className="first-then-section" aria-labelledby="first-then-heading">
      <p className="eyebrow">Focused view</p>
      <h2 id="first-then-heading">First / Then</h2>

      <div className="first-then-grid">
        <FirstThenCard
          label="First"
          activity={first}
          variant="first"
          onSelectActivity={onSelectActivity}
          onToggleActivityComplete={onToggleActivityComplete}
        />
        <FirstThenCard
          label="Then"
          activity={then}
          variant="then"
          onSelectActivity={onSelectActivity}
          onToggleActivityComplete={onToggleActivityComplete}
        />
      </div>
    </section>
  );
}
