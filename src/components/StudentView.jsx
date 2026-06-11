import ActivityCard from "./ActivityCard.jsx";
import EmptyState from "./EmptyState.jsx";
import FirstThenView from "./FirstThenView.jsx";
import ProgressSummary from "./ProgressSummary.jsx";
import StudentActivityDetail from "./StudentActivityDetail.jsx";
import StudentScheduleBuilder from "./StudentScheduleBuilder.jsx";
import StudentViewToggle from "./StudentViewToggle.jsx";

export default function StudentView({
  profile,
  activities,
  selectedActivity,
  selectedActivityId,
  studentViewMode,
  studentActivityLibrary,
  independenceSettings,
  onStudentViewModeChange,
  onSelectActivity,
  onToggleActivityComplete,
  onToggleStep,
  onStudentAddActivity,
  onMoveActivity,
  onRemoveActivity,
  onStudentClearSchedule,
  onCloseDetail,
}) {
  return (
    <>
      <section className="panel student-profile-banner" aria-label="Active student profile">
        <div>
          <p className="eyebrow">Current schedule for</p>
          <h2>{profile?.name ?? "No profile selected"}</h2>
        </div>
        {profile?.notes ? <p>{profile.notes}</p> : null}
      </section>

      <ProgressSummary activities={activities} />

      <StudentViewToggle
        viewMode={studentViewMode}
        onViewModeChange={onStudentViewModeChange}
      />

      {studentViewMode === "builder" ? (
        <div className="workspace-grid student-builder-workspace">
          <StudentScheduleBuilder
            profile={profile}
            activities={activities}
            libraryItems={studentActivityLibrary}
            independenceSettings={independenceSettings}
            onAddActivity={onStudentAddActivity}
            onMoveActivity={onMoveActivity}
            onRemoveActivity={onRemoveActivity}
            onClearSchedule={onStudentClearSchedule}
            onSelectActivity={onSelectActivity}
          />

          <StudentActivityDetail
            activity={selectedActivity}
            onClose={onCloseDetail}
            onToggleStep={onToggleStep}
            onToggleActivityComplete={onToggleActivityComplete}
          />
        </div>
      ) : studentViewMode === "firstThen" ? (
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
                <h2 id="schedule-heading">Use my schedule</h2>
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
