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
    <>
      <section className="panel student-profile-banner" aria-label="Active student profile">
        <div>
          <p className="eyebrow">Current schedule for</p>
          <h2>{profile?.name ?? "No profile selected"}</h2>
        </div>
        {profile?.notes ? <p>{profile.notes}</p> : null}
      </section>

      <StaffAccessPanel
        session={session}
        authStatus={authStatus}
        isAuthWorking={isAuthWorking}
        onSignIn={onSignIn}
        onSignUp={onSignUp}
        onSignOut={onSignOut}
        onOpenStaffMode={onOpenStaffMode}
      />

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
          <section className="panel student-schedule-guidance simple-student-panel" aria-labelledby="student-schedule-guidance-heading">
            <p className="eyebrow">My schedule</p>
            <h2 id="student-schedule-guidance-heading">Tap a card. Do the steps.</h2>
          </section>

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
    </>
  );
}
