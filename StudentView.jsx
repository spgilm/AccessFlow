import VisualSupport from "./VisualSupport.jsx";

export default function ActivityCard({
  activity,
  isSelected,
  onSelect,
  onToggleComplete,
}) {
  const statusText = activity.completed ? "Complete" : "Not complete";
  const actionText = isSelected ? "Hide smaller steps" : "Show smaller steps";

  return (
    <article
      className={`activity-card ${activity.completed ? "is-complete" : ""} ${
        isSelected ? "is-selected" : ""
      }`}
    >
      <button
        className="activity-main-button"
        type="button"
        onClick={() => onSelect(activity.id)}
        aria-pressed={isSelected}
        aria-label={`${actionText} for ${activity.label}. Status: ${statusText}.`}
      >
        <VisualSupport visual={activity.visual ?? activity.emoji} className="activity-visual" />
        <span className="activity-text">
          <span className="activity-label">{activity.label}</span>
          <span className="activity-summary">{activity.summary}</span>
          <span className="activity-status">{statusText}</span>
          <span className="activity-hint">
            {isSelected ? "Tap card to close steps" : "Tap card for steps"}
          </span>
        </span>
      </button>

      <button
        className="complete-button"
        type="button"
        onClick={() => onToggleComplete(activity.id)}
        aria-label={
          activity.completed
            ? `Mark ${activity.label} as not complete`
            : `Mark ${activity.label} as complete`
        }
      >
        {activity.completed ? "Undo" : "Done"}
      </button>
    </article>
  );
}
