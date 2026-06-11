import ActivityCard from "./ActivityCard.jsx";
import EmptyState from "./EmptyState.jsx";
import FirstThenView from "./FirstThenView.jsx";
import ProgressSummary from "./ProgressSummary.jsx";
import StudentActivityDetail from "./StudentActivityDetail.jsx";
import StudentViewToggle from "./StudentViewToggle.jsx";

export default function StudentView({
  activities,
  selectedActivity,
  selectedActivityId,
  studentViewMode,
  onStudentViewModeChange,
  onSelectActivity,
  onToggleActivityComplete,
  onToggleStep,
  onCloseDetail,
}) {
  return (
    <>
      <ProgressSummary activities={activities} />

      <StudentViewToggle
        viewMode={studentViewMode}
        onViewModeChange={onStudentViewModeChange}
      />

      {studentViewMode === "firstThen" ? (
        <div className="workspace-grid">
          <FirstThenView
            activities={activities}
            onSelectActivity={onSelectActivity}
            onToggleActivityComplete={onToggleActivityComplete}
          />

          <StudentActivityDetail
            activity={selectedActivity}
            onClose={onCloseDetail}
            onToggleStep={onToggleStep}
            onToggleActivityComplete={onToggleActivityComplete}
          />
        </div>
      ) : (
        <div className="workspace-grid">
          <section className="schedule-section" aria-labelledby="schedule-heading">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">Student / client view</p>
                <h2 id="schedule-heading">Today&apos;s schedule</h2>
              </div>
            </div>

            {activities.length === 0 ? (
              <EmptyState />
            ) : (
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
            )}
          </section>

          <StudentActivityDetail
            activity={selectedActivity}
            onClose={onCloseDetail}
            onToggleStep={onToggleStep}
            onToggleActivityComplete={onToggleActivityComplete}
          />
        </div>
      )}
    </>
  );
}
