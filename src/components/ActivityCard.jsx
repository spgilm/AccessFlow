import EmojiPickerButton from "./EmojiPickerButton.jsx";

export default function ActivityCard({
  activity,
  isSelected,
  onSelect,
  onToggleComplete,
  onUpdateVisual,
}) {
  const statusText = activity.completed ? "Complete" : "Not complete";
  const actionText = isSelected ? "Hide smaller steps" : "Show smaller steps";

  return (
    <article
      className={`activity-card ${activity.completed ? "is-complete" : ""} ${
        isSelected ? "is-selected" : ""
      }`}
    >
      <div className="activity-card-main-row">
        <EmojiPickerButton
          visual={activity.visual ?? activity.emoji}
          displayVisual={activity.completed ? "✅" : undefined}
          label={activity.label}
          className="activity-visual-picker"
          onChange={(visual) => onUpdateVisual?.(activity.id, visual)}
        />

        <button
          className="activity-main-button"
          type="button"
          onClick={() => onSelect(activity.id)}
          aria-pressed={isSelected}
          aria-label={`${actionText} for ${activity.label}. Status: ${statusText}.`}
        >
          <span className="activity-text">
            <span className="activity-label">{activity.label}</span>
            <span className="activity-status">{isSelected ? "Steps open" : statusText}</span>
          </span>
        </button>
      </div>

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
