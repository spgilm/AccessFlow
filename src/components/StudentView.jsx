import ActivityCard from "./ActivityCard.jsx";
import EmptyState from "./EmptyState.jsx";
import FirstThenView from "./FirstThenView.jsx";
import ProgressSummary from "./ProgressSummary.jsx";
import StudentActivityDetail from "./StudentActivityDetail.jsx";
import StudentInlineSteps from "./StudentInlineSteps.jsx";
import StudentScheduleBuilder from "./StudentScheduleBuilder.jsx";
import StudentViewToggle from "./StudentViewToggle.jsx";
import StaffAccessPanel from "./StaffAccessPanel.jsx";

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
  onUpdateActivityVisual,
  onUpdateStepVisual,
  onStudentAddActivity,
  onMoveActivity,
  onRemoveActivity,
  onStudentClearSchedule,
  onCloseDetail,
  session,
  authStatus,
  isAuthWorking,
  onSignIn,
  onSignUp,
  onSignOut,
  onOpenStaffMode,
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

  function handleScheduleCardSelect(activityId) {
    if (activityId === selectedActivityId) {
      onCloseDetail();
      return;
    }

    onSelectActivity(activityId);
  }

  return (
    <div className="student-flow">
      <StaffAccessPanel
        session={session}
        authStatus={authStatus}
        isAuthWorking={isAuthWorking}
        onSignIn={onSignIn}
        onSignUp={onSignUp}
        onSignOut={onSignOut}
        onOpenStaffMode={onOpenStaffMode}
      />

      <section className="student-profile-strip" aria-label="Active student profile">
        <span>Schedule for</span>
        <strong>{profile?.name ?? "No profile selected"}</strong>
      </section>

      <ProgressSummary activities={activities} />

      <StudentViewToggle
        viewMode={studentViewMode}
        onViewModeChange={onStudentViewModeChange}
      />

      {isFirstThenView ? (
        <div className="workspace-grid first-then-workspace">
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
            onUpdateActivityVisual={onUpdateActivityVisual}
            onUpdateStepVisual={onUpdateStepVisual}
          />
        </div>
      ) : (
        <>
          <section className="schedule-section student-schedule-primary" aria-labelledby="schedule-heading">
            <div className="section-heading-row simplified-heading-row">
              <div>
                <p className="eyebrow">Do this</p>
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
                {activities.map((activity, index) => {
                  const isExpanded = activity.id === selectedActivityId;

                  return (
                    <div
                      key={activity.id}
                      className={`student-schedule-item ${isExpanded ? "is-expanded" : ""}`}
                    >
                      <ActivityCard
                        activity={activity}
                        isSelected={isExpanded}
                        onSelect={handleScheduleCardSelect}
                        onToggleComplete={onToggleActivityComplete}
                      />

                      {isExpanded ? (
                        <StudentInlineSteps
                          activity={activity}
                          onToggleStep={onToggleStep}
                          onUpdateStepVisual={onUpdateStepVisual}
                        />
                      ) : null}

                      {canReorder || canRemove ? (
                        <div className="student-card-actions" aria-label={`Change ${activity.label}`}>
                          {canReorder ? (
                            <>
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
                  );
                })}
              </div>
            )}
          </section>

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
    </div>
  );
}
