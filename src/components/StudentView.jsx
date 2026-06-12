/**
 * Student-facing workflow screen. Keeps student tools split into Today, Choose, Make, and Board so each screen has one clear job.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useState } from "react";
import ActivityCard from "./ActivityCard.jsx";
import EmptyState from "./EmptyState.jsx";
import FirstThenView from "./FirstThenView.jsx";
import ProgressSummary from "./ProgressSummary.jsx";
import ScheduleDatePicker from "./ScheduleDatePicker.jsx";
import StudentBreakPlan from "./StudentBreakPlan.jsx";
import StudentActivityDetail from "./StudentActivityDetail.jsx";
import StudentChoiceBank from "./StudentChoiceBank.jsx";
import StudentChoiceBoard from "./StudentChoiceBoard.jsx";
import StudentSupportPanel from "./StudentSupportPanel.jsx";
import StudentInlineSteps from "./StudentInlineSteps.jsx";
import StudentMakeActivity from "./StudentMakeActivity.jsx";
import StaffAccessPanel from "./StaffAccessPanel.jsx";

function getStudentTabs(displaySettings) {
  return [
    { id: "today", label: "Today" },
    displaySettings?.showChooseTab !== false ? { id: "choose", label: "Choose" } : null,
    displaySettings?.showMakeTab !== false ? { id: "make", label: "Make" } : null,
    displaySettings?.showChoiceBoardTab !== false ? { id: "board", label: "Board" } : null,
  ].filter(Boolean);
}

function WorkflowTabs({ tabs, activeTab, onChange, label }) {
  return (
    <nav className="workflow-tabs" aria-label={label}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={activeTab === tab.id ? "is-active" : ""}
          onClick={() => onChange(tab.id)}
          aria-pressed={activeTab === tab.id}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default function StudentView({
  profile,
  activities,
  selectedActivity,
  selectedActivityId,
  scheduleDate,
  onScheduleDateChange,
  studentActivityLibrary,
  independenceSettings,
  displaySettings,
  supportEvents,
  onSelectActivity,
  onToggleActivityComplete,
  onToggleStep,
  onUpdateActivityVisual,
  onUpdateStepVisual,
  onUpdateStepPrompt,
  onStudentAddActivity,
  onSupportRequest,
  onMoveActivity,
  onRemoveActivity,
  onStudentClearSchedule,
  onCloseDetail,
  session,
  authStatus,
  isAuthWorking,
  onSignIn,
  onSignUp,
  onGoogleSignIn,
  onSignOut,
  onOpenStaffMode,
}) {
  const [activeStudentTab, setActiveStudentTab] = useState(displaySettings?.defaultStudentView ?? "today");
  const [todayView, setTodayView] = useState("schedule");
  const studentTabs = getStudentTabs(displaySettings);
  const currentActivity = activities.find((activity) => !activity.completed) ?? activities[0] ?? null;
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);

  const canReorder = independenceSettings.studentCanReorderSchedule;
  const canRemove = independenceSettings.studentCanRemoveActivities;
  const canClear = independenceSettings.studentCanClearSchedule;
  const canEditSchedule = canReorder || canRemove || canClear;

  function handleScheduleCardSelect(activityId) {
    if (activityId === selectedActivityId) {
      onCloseDetail();
      return;
    }

    onSelectActivity(activityId);
  }

  return (
    <div className="student-flow v13-student-flow">
      <StaffAccessPanel
        session={session}
        authStatus={authStatus}
        isAuthWorking={isAuthWorking}
        onSignIn={onSignIn}
        onSignUp={onSignUp}
        onGoogleSignIn={onGoogleSignIn}
        onSignOut={onSignOut}
        onOpenStaffMode={onOpenStaffMode}
      />

      <section className="student-profile-strip" aria-label="Active student profile">
        <span>Schedule for</span>
        <strong>{profile?.name ?? "No profile selected"}</strong>
      </section>

      <WorkflowTabs
        tabs={studentTabs}
        activeTab={activeStudentTab}
        onChange={setActiveStudentTab}
        label="Student tools"
      />

      {activeStudentTab === "today" ? (
        <section className="student-tab-screen" aria-labelledby="student-today-heading">
          <div className="focus-header compact-focus-header">
            <p className="eyebrow">Today</p>
            <h2 id="student-today-heading">What am I doing?</h2>
          </div>

          <ScheduleDatePicker
            scheduleDate={scheduleDate}
            onScheduleDateChange={onScheduleDateChange}
            compact
          />

          {displaySettings?.showProgress !== false ? (
            <ProgressSummary activities={activities} />
          ) : null}

          <StudentSupportPanel
            currentActivity={currentActivity}
            onSupportRequest={onSupportRequest}
          />

          <StudentBreakPlan
            currentActivity={currentActivity}
            onSupportRequest={onSupportRequest}
          />

          <div className="view-mini-toggle" role="group" aria-label="Today view">
            <button
              type="button"
              className={todayView === "schedule" ? "is-active" : ""}
              onClick={() => setTodayView("schedule")}
              aria-pressed={todayView === "schedule"}
            >
              Schedule
            </button>
            <button
              type="button"
              className={todayView === "firstThen" ? "is-active" : ""}
              onClick={() => setTodayView("firstThen")}
              aria-pressed={todayView === "firstThen"}
            >
              First / Then
            </button>
          </div>

          {todayView === "firstThen" ? (
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
            <section className="schedule-section student-schedule-primary" aria-labelledby="schedule-heading">
              <div className="section-heading-row simplified-heading-row">
                <div>
                  <p className="eyebrow">Do this</p>
                  <h2 id="schedule-heading">My schedule</h2>
                </div>

                {canEditSchedule && activities.length > 0 ? (
                  <button
                    type="button"
                    className="secondary-button compact-action-button"
                    onClick={() => setIsEditingSchedule((current) => !current)}
                    aria-pressed={isEditingSchedule}
                  >
                    {isEditingSchedule ? "Done editing" : "Change"}
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
                          onUpdateVisual={onUpdateActivityVisual}
                        />

                        {isExpanded ? (
                          <StudentInlineSteps
                            activity={activity}
                            onToggleStep={onToggleStep}
                            onUpdateStepVisual={onUpdateStepVisual}
                            onUpdateStepPrompt={onUpdateStepPrompt}
                            showPromptControls={displaySettings?.showPromptControls !== false}
                            showStepNumbers={displaySettings?.showStepNumbers !== false}
                            showTimers={displaySettings?.showTimers !== false}
                          />
                        ) : null}

                        {isEditingSchedule ? (
                          <div className="student-card-actions editing-actions" aria-label={`Change ${activity.label}`}>
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

                  {isEditingSchedule && canClear ? (
                    <button type="button" className="danger-wide-button" onClick={onStudentClearSchedule}>
                      Start over
                    </button>
                  ) : null}
                </div>
              )}
            </section>
          )}
        </section>
      ) : null}

      {activeStudentTab === "choose" ? (
        <StudentChoiceBank
          profile={profile}
          libraryItems={studentActivityLibrary}
          independenceSettings={independenceSettings}
          displaySettings={displaySettings}
          onAddActivity={onStudentAddActivity}
        />
      ) : null}

      {activeStudentTab === "make" ? (
        <StudentMakeActivity
          independenceSettings={independenceSettings}
          displaySettings={displaySettings}
          onAddActivity={onStudentAddActivity}
        />
      ) : null}
    </div>
  );
}
