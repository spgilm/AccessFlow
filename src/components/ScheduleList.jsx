import ActivityCard from "./ActivityCard.jsx";
import EmptyState from "./EmptyState.jsx";

export default function ScheduleList({
  activities,
  selectedActivityId,
  onSelectActivity,
  onToggleActivityComplete,
}) {
  if (activities.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="schedule-section" aria-labelledby="schedule-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Student / client view</p>
          <h2 id="schedule-heading">Today&apos;s schedule</h2>
        </div>
      </div>

      <div className="schedule-list">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            isSelected={activity.id === selectedActivityId}
            onSelect={onSelectActivity}
            onToggleComplete={onToggleActivityComplete}
          />
        ))}
      </div>
    </section>
  );
}
