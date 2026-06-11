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
  const isFirstThenView = studentViewMode === "firstThen";
  const canReorder = independenceSettings.studentCanReorderSchedule;
  const canRemove = independenceSettings.studentCanRemoveActivities;
  const canClear = independenceSettings.studentCanClearSchedule;
  const canChangeSchedule =
    independenceSettings.studentCanBuildSchedule ||
    canReorder ||
    canRemove ||
    canClear;

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

      {isFirstThenView ? (
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
        <>
          <section className="panel student-schedule-guidance" aria-labelledby="student-schedule-guidance-heading">
            <p className="eyebrow">Student independence</p>
            <h2 id="student-schedule-guidance-heading">See the schedule first. Change it here too.</h2>
            <p>
              The schedule is the default view. Students can use the schedule and, when staff allows it, add or adjust activities without leaving this page.
            </p>
          </section>

          <div className="workspace-grid student-schedule-workspace">
            <section className="schedule-section student-schedule-primary" aria-labelledby="schedule-heading">
              <div className="section-heading-row">
                <div>
                  <p className="eyebrow">Student / client view</p>
                  <h2 id="schedule-heading">My schedule</h2>
                </div>

                {canClear && activities.length > 0 ? (
                  <button type="button" className="small-danger-button" onClick={onStudentClearSchedule}>
                    Start over
                  </button>
                ) : null}
              </div>

              {activities.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="schedule-list">
                  {activities.map((activity, index) => (
                    <div key={activity.id} className="student-schedule-item">
                      <ActivityCard
                        activity={activity}
                        isSelected={activity.id === selectedActivityId}
                        onSelect={onSelectActivity}
                        onToggleComplete={onToggleActivityComplete}
                      />

                      {canReorder || canRemove ? (
                        <div className="student-card-actions" aria-label={`Change ${activity.label}`}>
                          {canReorder ? (
                            <>
                              <button
                                type="button"
                                onClick={() => onMoveActivity(activity.id, "up")}
                                disabled={index === 0}
                              >
                                Move up
                              </button>
                              <button
                                type="button"
                                onClick={() => onMoveActivity(activity.id, "down")}
                                disabled={index === activities.length - 1}
                              >
                                Move down
                              </button>
                            </>
                          ) : null}

                          {canRemove ? (
                            <button
                              type="button"
                              className="small-danger-button"
                              onClick={() => onRemoveActivity(activity.id)}
                            >
                              Remove
                            </button>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
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

          {canChangeSchedule ? (
            <StudentScheduleBuilder
              profile={profile}
              libraryItems={studentActivityLibrary}
              independenceSettings={independenceSettings}
              onAddActivity={onStudentAddActivity}
            />
          ) : null}
        </>
      )}
    </>
  );
}
