/**
 * Student-facing workflow screen. Keeps student tools split into Today, Choose, Make, and Board so each screen has one clear job.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useEffect, useMemo, useState } from "react";
import ActivityCard from "./ActivityCard.jsx";
import EmptyState from "./EmptyState.jsx";
import FirstThenView from "./FirstThenView.jsx";
import ProgressSummary from "./ProgressSummary.jsx";
import ScheduleDatePicker from "./ScheduleDatePicker.jsx";
import StudentBreakPlan from "./StudentBreakPlan.jsx";
import StudentActivityDetail from "./StudentActivityDetail.jsx";
import StudentChoiceBank from "./StudentChoiceBank.jsx";
import StudentGuidedScheduleBuilder from "./StudentGuidedScheduleBuilder.jsx";
import StudentChoiceBoard from "./StudentChoiceBoard.jsx";
import StudentSupportPanel from "./StudentSupportPanel.jsx";
import StudentTransitionPanel from "./StudentTransitionPanel.jsx";
import StudentCheckInPanel from "./StudentCheckInPanel.jsx";
import StudentRewardPanel from "./StudentRewardPanel.jsx";
import StudentPainBodyPanel from "./StudentPainBodyPanel.jsx";
import StudentSensoryPanel from "./StudentSensoryPanel.jsx";
import StudentRegulationPathway from "./StudentRegulationPathway.jsx";
import StudentWaitingSupport from "./StudentWaitingSupport.jsx";
import StudentYesNoPanel from "./StudentYesNoPanel.jsx";
import StudentHelpRequestBuilder from "./StudentHelpRequestBuilder.jsx";
import StudentDecisionSupport from "./StudentDecisionSupport.jsx";
import StudentStuckPathway from "./StudentStuckPathway.jsx";
import StudentScheduleChangeRequest from "./StudentScheduleChangeRequest.jsx";
import StudentCommunityAccessPanel from "./StudentCommunityAccessPanel.jsx";
import StudentVocationalTaskPanel from "./StudentVocationalTaskPanel.jsx";
import StudentAboutMePanel from "./StudentAboutMePanel.jsx";
import StudentActivityPrepPanel from "./StudentActivityPrepPanel.jsx";
import StudentActivityReflectionPanel from "./StudentActivityReflectionPanel.jsx";
import StudentTryAgainLaterPanel from "./StudentTryAgainLaterPanel.jsx";
import StudentCalmScreenPanel from "./StudentCalmScreenPanel.jsx";
import StudentCommunicationRepairPanel from "./StudentCommunicationRepairPanel.jsx";
import StudentSwitchScannerPanel from "./StudentSwitchScannerPanel.jsx";
import StudentAacCoreWordsPanel from "./StudentAacCoreWordsPanel.jsx";
import StudentQuickPhrasesPanel from "./StudentQuickPhrasesPanel.jsx";
import StudentFeelingsIntensityPanel from "./StudentFeelingsIntensityPanel.jsx";
import StudentSocialScriptsPanel from "./StudentSocialScriptsPanel.jsx";
import StudentInlineSteps from "./StudentInlineSteps.jsx";
import StudentMakeActivity from "./StudentMakeActivity.jsx";
import StaffAccessPanel from "./StaffAccessPanel.jsx";
import PrototypeSafetyFooter from "./PrototypeSafetyFooter.jsx";
import { resolveInitialStudentTab, resolveStudentTabs } from "../data/displaySettings.js";
import { getVisualPreferenceClass, getVisualPreferenceLabel } from "../utils/visualPreferences.js";

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

function StudentToolGroup({ title, description, defaultOpen = false, children }) {
  return (
    <details className="student-tool-group" open={defaultOpen}>
      <summary>
        <span>
          <strong>{title}</strong>
          {description ? <small>{description}</small> : null}
        </span>
      </summary>
      <div className="student-tool-group-body">{children}</div>
    </details>
  );
}

function StudentAccessibilitySummary({ displaySettings }) {
  return (
    <section className="student-accessibility-summary" aria-label="Student display settings">
      <span>{displaySettings?.interfaceLevel ?? "standard"} mode</span>
      <span>{displaySettings?.touchSize ?? "standard"} touch</span>
      <span>{displaySettings?.textDisplay ?? "iconsAndWords"}</span>
      <span>{getVisualPreferenceLabel(displaySettings)} visual preference</span>
    </section>
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
  choiceBoardItems,
  independenceSettings,
  displaySettings,
  transitionSettings,
  reinforcementSettings,
  communicationSupportSettings,
  selfAdvocacySupportSettings,
  lifeSkillsSettings,
  aboutMeProfile,
  aacExpansionSettings,
  hideStaffAccess = false,
  supportEvents,
  onSelectActivity,
  onToggleActivityComplete,
  onToggleStep,
  onUpdateActivityVisual,
  onUpdateStepVisual,
  onUpdateStepPrompt,
  onStudentAddActivity,
  onSupportRequest,
  onRecordCheckIn,
  onRequestReward,
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
  const [activeStudentTab, setActiveStudentTab] = useState(resolveInitialStudentTab(displaySettings));
  const [todayView, setTodayView] = useState(
    displaySettings?.studentModeLayout === "firstThenOnly" ? "firstThen" : "schedule"
  );
  const studentTabs = useMemo(() => resolveStudentTabs(displaySettings), [displaySettings]);
  const currentActivity = activities.find((activity) => !activity.completed) ?? activities[0] ?? null;
  const currentActivityIndex = currentActivity
    ? activities.findIndex((activity) => activity.id === currentActivity.id)
    : -1;
  const nextActivity =
    currentActivityIndex >= 0
      ? activities.slice(currentActivityIndex + 1).find((activity) => !activity.completed) ?? null
      : null;
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);

  const canReorder = independenceSettings.studentCanReorderSchedule;
  const canRemove = independenceSettings.studentCanRemoveActivities;
  const canClear = independenceSettings.studentCanClearSchedule;
  const canEditSchedule = canReorder || canRemove || canClear;
const isSimpleMode = displaySettings?.interfaceLevel === "simple";
const isFirstThenOnly = displaySettings?.studentModeLayout === "firstThenOnly";
const studentFlowClasses = [
  "student-flow",
  "v13-student-flow",
  `student-level-${displaySettings?.interfaceLevel ?? "standard"}`,
  `student-layout-${displaySettings?.studentModeLayout ?? "tabs"}`,
  `student-touch-${displaySettings?.touchSize ?? "standard"}`,
  `student-text-${displaySettings?.textDisplay ?? "iconsAndWords"}`,
  getVisualPreferenceClass(displaySettings),
  `student-panel-layout-${displaySettings?.studentPanelLayout ?? "grouped"}`,
  displaySettings?.reduceMotion ? "student-reduce-motion" : "",
  displaySettings?.reducedChoiceMode ? "student-reduced-choice-mode" : "",
  displaySettings?.eyeGazeFriendly ? "student-eye-gaze-friendly" : "",
]
  .filter(Boolean)
  .join(" ");
const studentPanelLayout = displaySettings?.studentPanelLayout ?? "grouped";
const groupStudentPanels = studentPanelLayout !== "open";
const coreToolsOpen = studentPanelLayout === "grouped";
const supportToolsOpen = studentPanelLayout === "open";
const hasCoreTools =
  displaySettings?.showAboutMePanel !== false ||
  displaySettings?.showScheduleDate !== false ||
  displaySettings?.showCheckIn !== false ||
  displaySettings?.showRewardBoard !== false ||
  displaySettings?.showProgress !== false;
const hasSupportTools =
  displaySettings?.showSupportButtons !== false ||
  displaySettings?.showBreakPlan !== false ||
  displaySettings?.showTransitionSupports !== false;
const hasCommunicationTools =
  displaySettings?.showPainBodyPanel !== false ||
  displaySettings?.showSensoryPanel !== false ||
  displaySettings?.showRegulationPathway !== false ||
  displaySettings?.showWaitingSupport !== false;
const hasSelfAdvocacyTools =
  displaySettings?.showYesNoPanel !== false ||
  displaySettings?.showHelpRequestBuilder !== false ||
  displaySettings?.showDecisionSupport !== false ||
  displaySettings?.showStuckPathway !== false ||
  displaySettings?.showScheduleChangeRequest !== false;
const hasLifeSkillsTools =
  displaySettings?.showCommunityAccessPanel !== false ||
  displaySettings?.showVocationalTaskPanel !== false;
const hasActivityReadinessTools =
  displaySettings?.showActivityPrepPanel !== false ||
  displaySettings?.showActivityReflectionPanel !== false ||
  displaySettings?.showTryAgainLaterPanel !== false;
const hasAlternativeAccessTools =
  displaySettings?.showCalmScreenPanel !== false ||
  displaySettings?.showCommunicationRepairPanel !== false ||
  displaySettings?.showSwitchScannerPanel !== false;
const hasAacExpansionTools =
  displaySettings?.showCoreWordsPanel !== false ||
  displaySettings?.showQuickPhrasesPanel !== false ||
  displaySettings?.showFeelingsIntensityPanel !== false ||
  displaySettings?.showSocialScriptsPanel !== false;

useEffect(() => {
  const availableTabIds = studentTabs.map((tab) => tab.id);

  if (!availableTabIds.includes(activeStudentTab)) {
    setActiveStudentTab(availableTabIds[0] ?? "today");
  }

  if (isFirstThenOnly) {
    setTodayView("firstThen");
  }
}, [activeStudentTab, isFirstThenOnly, studentTabs]);


  function handleScheduleCardSelect(activityId) {
    if (activityId === selectedActivityId) {
      onCloseDetail();
      return;
    }

    onSelectActivity(activityId);
  }

  return (
    <div className={studentFlowClasses}>
      {!hideStaffAccess ? (
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
      ) : null}

      <section className="student-profile-strip" aria-label="Active student profile">
        <span>Schedule for</span>
        <strong>{profile?.name ?? "No profile selected"}</strong>
      </section>

      {displaySettings?.showStudentToolSummary !== false ? (
        <StudentAccessibilitySummary displaySettings={displaySettings} />
      ) : null}

      {studentTabs.length > 1 ? (
        <WorkflowTabs
          tabs={studentTabs}
          activeTab={activeStudentTab}
          onChange={setActiveStudentTab}
          label="Student tools"
        />
      ) : null}

      {studentTabs.length > 1 ? (
        <nav className="student-mobile-quick-nav" aria-label="Quick student navigation">
          {studentTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeStudentTab === tab.id ? "is-active" : ""}
              onClick={() => setActiveStudentTab(tab.id)}
              aria-pressed={activeStudentTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      ) : null}

      {activeStudentTab === "today" ? (
        <section className="student-tab-screen" aria-labelledby="student-today-heading">
          <div className="focus-header compact-focus-header">
            <p className="eyebrow">Today</p>
            <h2 id="student-today-heading">What am I doing?</h2>
          </div>

          {groupStudentPanels ? (
            <>
              {hasCoreTools ? (
                <StudentToolGroup
                  title="Start tools"
                  description="Date, check-in, rewards, and progress"
                  defaultOpen={coreToolsOpen}
                >
                  {displaySettings?.showAboutMePanel !== false ? (
                    <StudentAboutMePanel
                      profile={profile}
                      aboutMeProfile={aboutMeProfile}
                    />
                  ) : null}

                  {displaySettings?.showScheduleDate !== false ? (
                    <ScheduleDatePicker
                      scheduleDate={scheduleDate}
                      onScheduleDateChange={onScheduleDateChange}
                      compact
                    />
                  ) : null}

                  {displaySettings?.showCheckIn !== false ? (
                    <StudentCheckInPanel onRecordCheckIn={onRecordCheckIn} />
                  ) : null}

                  {displaySettings?.showRewardBoard !== false ? (
                    <StudentRewardPanel
                      reinforcementSettings={reinforcementSettings}
                      onRequestReward={onRequestReward}
                    />
                  ) : null}

                  {displaySettings?.showProgress !== false ? (
                    <ProgressSummary activities={activities} />
                  ) : null}
                </StudentToolGroup>
              ) : null}

              {hasSupportTools ? (
                <StudentToolGroup
                  title="Help tools"
                  description="Help, breaks, and transition support"
                  defaultOpen={supportToolsOpen}
                >
                  {displaySettings?.showSupportButtons !== false ? (
                    <StudentSupportPanel
                      currentActivity={currentActivity}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showBreakPlan !== false ? (
                    <StudentBreakPlan
                      currentActivity={currentActivity}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showTransitionSupports !== false ? (
                    <StudentTransitionPanel
                      currentActivity={currentActivity}
                      nextActivity={nextActivity}
                      transitionSettings={transitionSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}
                </StudentToolGroup>
              ) : null}

              {hasCommunicationTools ? (
                <StudentToolGroup
                  title="Communication tools"
                  description="Pain, sensory, feelings, and waiting"
                  defaultOpen={studentPanelLayout === "open"}
                >
                  {displaySettings?.showPainBodyPanel !== false ? (
                    <StudentPainBodyPanel
                      communicationSupportSettings={communicationSupportSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showSensoryPanel !== false ? (
                    <StudentSensoryPanel
                      communicationSupportSettings={communicationSupportSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showRegulationPathway !== false ? (
                    <StudentRegulationPathway
                      communicationSupportSettings={communicationSupportSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showWaitingSupport !== false ? (
                    <StudentWaitingSupport
                      communicationSupportSettings={communicationSupportSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}
                </StudentToolGroup>
              ) : null}

              {hasSelfAdvocacyTools ? (
                <StudentToolGroup
                  title="Self-advocacy tools"
                  description="Answers, help, choices, stuck, and change requests"
                  defaultOpen={studentPanelLayout === "open"}
                >
                  {displaySettings?.showYesNoPanel !== false ? (
                    <StudentYesNoPanel
                      selfAdvocacySupportSettings={selfAdvocacySupportSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showHelpRequestBuilder !== false ? (
                    <StudentHelpRequestBuilder
                      selfAdvocacySupportSettings={selfAdvocacySupportSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showDecisionSupport !== false ? (
                    <StudentDecisionSupport
                      selfAdvocacySupportSettings={selfAdvocacySupportSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showStuckPathway !== false ? (
                    <StudentStuckPathway
                      selfAdvocacySupportSettings={selfAdvocacySupportSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showScheduleChangeRequest !== false ? (
                    <StudentScheduleChangeRequest
                      currentActivity={currentActivity}
                      selfAdvocacySupportSettings={selfAdvocacySupportSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}
                </StudentToolGroup>
              ) : null}

              {hasLifeSkillsTools ? (
                <StudentToolGroup
                  title="Life skills tools"
                  description="Community access and work task supports"
                  defaultOpen={studentPanelLayout === "open"}
                >
                  {displaySettings?.showCommunityAccessPanel !== false ? (
                    <StudentCommunityAccessPanel
                      lifeSkillsSettings={lifeSkillsSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showVocationalTaskPanel !== false ? (
                    <StudentVocationalTaskPanel
                      lifeSkillsSettings={lifeSkillsSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}
                </StudentToolGroup>
              ) : null}

              {hasActivityReadinessTools ? (
                <StudentToolGroup
                  title="Activity readiness tools"
                  description="Prepare, reflect, and try again later"
                  defaultOpen={studentPanelLayout === "open"}
                >
                  {displaySettings?.showActivityPrepPanel !== false ? (
                    <StudentActivityPrepPanel
                      currentActivity={currentActivity}
                      aboutMeProfile={aboutMeProfile}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showActivityReflectionPanel !== false ? (
                    <StudentActivityReflectionPanel
                      currentActivity={currentActivity}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showTryAgainLaterPanel !== false ? (
                    <StudentTryAgainLaterPanel
                      currentActivity={currentActivity}
                      supportEvents={supportEvents}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}
                </StudentToolGroup>
              ) : null}

              {hasAlternativeAccessTools ? (
                <StudentToolGroup
                  title="Alternative access and calm tools"
                  description="Calm screen, repair messages, and switch scanning"
                  defaultOpen={studentPanelLayout === "open" || displaySettings?.reducedChoiceMode === true}
                >
                  {displaySettings?.showCalmScreenPanel !== false ? (
                    <StudentCalmScreenPanel
                      aboutMeProfile={aboutMeProfile}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showCommunicationRepairPanel !== false ? (
                    <StudentCommunicationRepairPanel onSupportRequest={onSupportRequest} />
                  ) : null}

                  {displaySettings?.showSwitchScannerPanel !== false ? (
                    <StudentSwitchScannerPanel onSupportRequest={onSupportRequest} />
                  ) : null}
                </StudentToolGroup>
              ) : null}

              {hasAacExpansionTools ? (
                <StudentToolGroup
                  title="AAC expansion tools"
                  description="Core words, quick phrases, feelings, and social scripts"
                  defaultOpen={studentPanelLayout === "open"}
                >
                  {displaySettings?.showCoreWordsPanel !== false ? (
                    <StudentAacCoreWordsPanel
                      aacExpansionSettings={aacExpansionSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showQuickPhrasesPanel !== false ? (
                    <StudentQuickPhrasesPanel
                      aacExpansionSettings={aacExpansionSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showFeelingsIntensityPanel !== false ? (
                    <StudentFeelingsIntensityPanel
                      aacExpansionSettings={aacExpansionSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}

                  {displaySettings?.showSocialScriptsPanel !== false ? (
                    <StudentSocialScriptsPanel
                      aacExpansionSettings={aacExpansionSettings}
                      onSupportRequest={onSupportRequest}
                    />
                  ) : null}
                </StudentToolGroup>
              ) : null}
            </>
          ) : (
            <>
              {displaySettings?.showAboutMePanel !== false ? (
                <StudentAboutMePanel
                  profile={profile}
                  aboutMeProfile={aboutMeProfile}
                />
              ) : null}

              {displaySettings?.showScheduleDate !== false ? (
                <ScheduleDatePicker
                  scheduleDate={scheduleDate}
                  onScheduleDateChange={onScheduleDateChange}
                  compact
                />
              ) : null}

              {displaySettings?.showCheckIn !== false ? (
                <StudentCheckInPanel onRecordCheckIn={onRecordCheckIn} />
              ) : null}

              {displaySettings?.showRewardBoard !== false ? (
                <StudentRewardPanel
                  reinforcementSettings={reinforcementSettings}
                  onRequestReward={onRequestReward}
                />
              ) : null}

              {displaySettings?.showProgress !== false ? (
                <ProgressSummary activities={activities} />
              ) : null}

              {displaySettings?.showSupportButtons !== false ? (
                <StudentSupportPanel
                  currentActivity={currentActivity}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showBreakPlan !== false ? (
                <StudentBreakPlan
                  currentActivity={currentActivity}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showTransitionSupports !== false ? (
                <StudentTransitionPanel
                  currentActivity={currentActivity}
                  nextActivity={nextActivity}
                  transitionSettings={transitionSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showPainBodyPanel !== false ? (
                <StudentPainBodyPanel
                  communicationSupportSettings={communicationSupportSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showSensoryPanel !== false ? (
                <StudentSensoryPanel
                  communicationSupportSettings={communicationSupportSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showRegulationPathway !== false ? (
                <StudentRegulationPathway
                  communicationSupportSettings={communicationSupportSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showWaitingSupport !== false ? (
                <StudentWaitingSupport
                  communicationSupportSettings={communicationSupportSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showYesNoPanel !== false ? (
                <StudentYesNoPanel
                  selfAdvocacySupportSettings={selfAdvocacySupportSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showHelpRequestBuilder !== false ? (
                <StudentHelpRequestBuilder
                  selfAdvocacySupportSettings={selfAdvocacySupportSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showDecisionSupport !== false ? (
                <StudentDecisionSupport
                  selfAdvocacySupportSettings={selfAdvocacySupportSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showStuckPathway !== false ? (
                <StudentStuckPathway
                  selfAdvocacySupportSettings={selfAdvocacySupportSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showScheduleChangeRequest !== false ? (
                <StudentScheduleChangeRequest
                  currentActivity={currentActivity}
                  selfAdvocacySupportSettings={selfAdvocacySupportSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showCommunityAccessPanel !== false ? (
                <StudentCommunityAccessPanel
                  lifeSkillsSettings={lifeSkillsSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showVocationalTaskPanel !== false ? (
                <StudentVocationalTaskPanel
                  lifeSkillsSettings={lifeSkillsSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showActivityPrepPanel !== false ? (
                <StudentActivityPrepPanel
                  currentActivity={currentActivity}
                  aboutMeProfile={aboutMeProfile}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showActivityReflectionPanel !== false ? (
                <StudentActivityReflectionPanel
                  currentActivity={currentActivity}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showTryAgainLaterPanel !== false ? (
                <StudentTryAgainLaterPanel
                  currentActivity={currentActivity}
                  supportEvents={supportEvents}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showCalmScreenPanel !== false ? (
                <StudentCalmScreenPanel
                  aboutMeProfile={aboutMeProfile}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showCommunicationRepairPanel !== false ? (
                <StudentCommunicationRepairPanel onSupportRequest={onSupportRequest} />
              ) : null}

              {displaySettings?.showSwitchScannerPanel !== false ? (
                <StudentSwitchScannerPanel onSupportRequest={onSupportRequest} />
              ) : null}

              {displaySettings?.showCoreWordsPanel !== false ? (
                <StudentAacCoreWordsPanel
                  aacExpansionSettings={aacExpansionSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showQuickPhrasesPanel !== false ? (
                <StudentQuickPhrasesPanel
                  aacExpansionSettings={aacExpansionSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showFeelingsIntensityPanel !== false ? (
                <StudentFeelingsIntensityPanel
                  aacExpansionSettings={aacExpansionSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}

              {displaySettings?.showSocialScriptsPanel !== false ? (
                <StudentSocialScriptsPanel
                  aacExpansionSettings={aacExpansionSettings}
                  onSupportRequest={onSupportRequest}
                />
              ) : null}
            </>
          )}

          {!isFirstThenOnly ? (
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
          ) : null}

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

                {canEditSchedule && activities.length > 0 && !isSimpleMode ? (
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
                          displaySettings={displaySettings}
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

                        {isEditingSchedule && !isSimpleMode ? (
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

                  {isEditingSchedule && canClear && !isSimpleMode ? (
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
        <section className="student-tab-screen choose-tab-stack" aria-label="Choose activities">
          {displaySettings?.showGuidedScheduleBuilder !== false && independenceSettings.studentCanBuildSchedule ? (
            <StudentGuidedScheduleBuilder
              profile={profile}
              libraryItems={studentActivityLibrary}
              displaySettings={displaySettings}
              onAddActivity={onStudentAddActivity}
            />
          ) : null}

          <StudentChoiceBank
            profile={profile}
            libraryItems={studentActivityLibrary}
            independenceSettings={independenceSettings}
            displaySettings={displaySettings}
            onAddActivity={onStudentAddActivity}
          />
        </section>
      ) : null}

      {activeStudentTab === "make" ? (
        <StudentMakeActivity
          independenceSettings={independenceSettings}
          displaySettings={displaySettings}
          onAddActivity={onStudentAddActivity}
        />
      ) : null}

      {activeStudentTab === "board" ? (
        <StudentChoiceBoard
          boardItems={choiceBoardItems}
          libraryItems={displaySettings?.showBoardActivitySection === false ? [] : studentActivityLibrary}
          displaySettings={displaySettings}
          onAddActivity={onStudentAddActivity}
          onSupportRequest={onSupportRequest}
        />
      ) : null}

      <PrototypeSafetyFooter mode="student" />
    </div>
  );
}
