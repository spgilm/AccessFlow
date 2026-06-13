/**
 * Staff-facing workflow screen. Groups staff tools into Setup, Students, Choices, Schedule, Notes, and Save tabs.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useState } from "react";
import AddActivityForm from "./AddActivityForm.jsx";
import AuthPanel from "./AuthPanel.jsx";
import DataManagementPanel from "./DataManagementPanel.jsx";
import StaffSetupWizard from "./StaffSetupWizard.jsx";
import ScheduleDatePicker from "./ScheduleDatePicker.jsx";
import DailyTemplateButtons from "./DailyTemplateButtons.jsx";
import DocumentationPanel from "./DocumentationPanel.jsx";
import EventLogPanel from "./EventLogPanel.jsx";
import FirstThenBoardManager from "./FirstThenBoardManager.jsx";
import ReviewQueuePanel from "./ReviewQueuePanel.jsx";
import ProfileManager from "./ProfileManager.jsx";
import StudentModePresetPanel from "./StudentModePresetPanel.jsx";
import FeaturePresetPanel from "./FeaturePresetPanel.jsx";
import StaffActivityEditor from "./StaffActivityEditor.jsx";
import StaffActivityList from "./StaffActivityList.jsx";
import StaffChoiceBankPanel from "./StaffChoiceBankPanel.jsx";
import StaffChoiceBoardManager from "./StaffChoiceBoardManager.jsx";
import StaffVisualLibraryPanel from "./StaffVisualLibraryPanel.jsx";
import StaffIconLibraryPanel from "./StaffIconLibraryPanel.jsx";
import StaffGoalPanel from "./StaffGoalPanel.jsx";
import WeeklyProgressPanel from "./WeeklyProgressPanel.jsx";
import ExportUpgradePanel from "./ExportUpgradePanel.jsx";
import RoutineTemplatePanel from "./RoutineTemplatePanel.jsx";
import AccessibilityReviewPanel from "./AccessibilityReviewPanel.jsx";
import RolePermissionsPanel from "./RolePermissionsPanel.jsx";
import StaffSecurityPanel from "./StaffSecurityPanel.jsx";
import StaffTransitionSettingsPanel from "./StaffTransitionSettingsPanel.jsx";
import StaffDashboardPanel from "./StaffDashboardPanel.jsx";
import StaffFeatureGuidePanel from "./StaffFeatureGuidePanel.jsx";
import ActivitySearchPanel from "./ActivitySearchPanel.jsx";
import ProfileRecommendationsPanel from "./ProfileRecommendationsPanel.jsx";
import PrintSchedulePanel from "./PrintSchedulePanel.jsx";
import HandoffReportPanel from "./HandoffReportPanel.jsx";
import CaregiverHandoffPanel from "./CaregiverHandoffPanel.jsx";
import AboutMeExportPanel from "./AboutMeExportPanel.jsx";
import CommunicationHistoryPanel from "./CommunicationHistoryPanel.jsx";
import GoalSupportRecommendationsPanel from "./GoalSupportRecommendationsPanel.jsx";
import ActivitySupportPatternPanel from "./ActivitySupportPatternPanel.jsx";
import ActivityReadinessReviewPanel from "./ActivityReadinessReviewPanel.jsx";
import TryAgainLaterQueuePanel from "./TryAgainLaterQueuePanel.jsx";
import SessionNoteWizardPanel from "./SessionNoteWizardPanel.jsx";
import StaffObservationLogPanel from "./StaffObservationLogPanel.jsx";
import RegulationPlanPanel from "./RegulationPlanPanel.jsx";
import StaffReinforcementPanel from "./StaffReinforcementPanel.jsx";
import StaffCommunicationSupportPanel from "./StaffCommunicationSupportPanel.jsx";
import StaffSelfAdvocacySupportPanel from "./StaffSelfAdvocacySupportPanel.jsx";
import StaffLifeSkillsSettingsPanel from "./StaffLifeSkillsSettingsPanel.jsx";
import StaffAboutMePanel from "./StaffAboutMePanel.jsx";
import StaffAlternativeAccessGuidePanel from "./StaffAlternativeAccessGuidePanel.jsx";
import StaffAacExpansionPanel from "./StaffAacExpansionPanel.jsx";
import StaffVisualCoveragePanel from "./StaffVisualCoveragePanel.jsx";
import StaffReleaseReadinessPanel from "./StaffReleaseReadinessPanel.jsx";
import SupabaseSyncPanel from "./SupabaseSyncPanel.jsx";
import TemplateManager from "./TemplateManager.jsx";
import PrototypeWarningPanel from "./PrototypeWarningPanel.jsx";
import DataHealthPanel from "./DataHealthPanel.jsx";
import BackendArchitecturePanel from "./BackendArchitecturePanel.jsx";
import BackendNormalizationStartPanel from "./BackendNormalizationStartPanel.jsx";
import ComplianceReadinessPanel from "./ComplianceReadinessPanel.jsx";
import PrototypeSafetyFooter from "./PrototypeSafetyFooter.jsx";

const staffTabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "setup", label: "Setup" },
  { id: "students", label: "Students" },
  { id: "choices", label: "Choices" },
  { id: "schedule", label: "Schedule" },
  { id: "notes", label: "Notes" },
  { id: "reports", label: "Reports" },
  { id: "save", label: "Save" },
];

function WorkflowTabs({ tabs, activeTab, onChange, label }) {
  return (
    <nav className="workflow-tabs staff-workflow-tabs" aria-label={label}>
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

export default function StaffView({
  profiles,
  selectedProfile,
  selectedProfileId,
  templates,
  activities,
  activityBank,
  choiceBoardItems,
  visualLibrary,
  progressGoals,
  weeklyProgressSummary,
  weeklyProgressReport,
  transitionSettings,
  accessibilityReview,
  staffSecurity,
  rolePermissions,
  reinforcementSettings,
  regulationPlan,
  communicationSupportSettings,
  selfAdvocacySupportSettings,
  lifeSkillsSettings,
  aboutMeProfile,
  aacExpansionSettings,
  supportObservations,
  handoffReport,
  dataHealth,
  sessionNotes,
  supportEvents,
  firstThenBoard,
  displaySettings,
  selectedActivity,
  selectedActivityId,
  scheduleDate,
  onScheduleDateChange,
  documentationDate,
  dailyNote,
  copyStatus,
  exportStatus,
  importStatus,
  syncStatus,
  isSyncing,
  syncMetadata,
  hasUnsavedCloudChanges,
  syncReminder,
  session,
  authStatus,
  isAuthWorking,
  onSignIn,
  onSignUp,
  onGoogleSignIn,
  onSignOut,
  onDocumentationDateChange,
  onUpdateDailyNote,
  onCopyDailyNote,
  onDownloadDailyNote,
  onDownloadActivityCsv,
  onExportBackup,
  onImportBackup,
  onSaveCloudSnapshot,
  onLoadCloudSnapshot,
  onSelectProfile,
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile,
  onDismissReview,
  onUpdateFirstThenBoard,
  onAddFirstThenToSchedule,
  onApplyDailyTemplate,
  onOpenStudentMode,
  onSaveCurrentScheduleAsTemplate,
  onApplyTemplateToProfile,
  onDeleteTemplate,
  onAddActivity,
  onAddChoiceToBank,
  onAddBoardItem,
  onAddVisualLibraryItem,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onDownloadWeeklyReport,
  onUpdateTransitionSettings,
  onUpdateReinforcementSettings,
  onUpdateRegulationPlan,
  onUpdateCommunicationSupportSettings,
  onUpdateSelfAdvocacySupportSettings,
  onUpdateLifeSkillsSettings,
  onUpdateAacExpansionSettings,
  onUpdateAboutMeProfile,
  onAddSupportObservation,
  onAddSessionNote,
  onDownloadHandoffReport,
  onDownloadNormalizedExport,
  onUpdateAccessibilityReview,
  onUpdateStaffSecurity,
  onLockStaff,
  onUpdateRolePermissions,
  onApplyCurrentScheduleToTomorrow,
  onApplyCurrentScheduleToWeek,
  onDownloadGoalCsv,
  onDownloadSupportEventCsv,
  onDownloadPromptCsv,
  onExportSingleProfile,
  onUpdateVisualLibraryItem,
  onDeleteVisualLibraryItem,
  onResetVisualLibrary,
  onUpdateBoardItem,
  onDeleteBoardItem,
  onResetBoardItems,
  onUpdateBankChoice,
  onSaveActivityToBank,
  onAddBankChoiceToSchedule,
  onDeleteBankChoice,
  onSelectActivity,
  onMoveActivity,
  onUpdateActivity,
  onUpdateStep,
  onAddStep,
  onDeleteStep,
  onMoveStep,
  onDeleteActivity,
  onResetDemo,
  onClearSchedule,
}) {
  const [activeStaffTab, setActiveStaffTab] = useState("dashboard");

  return (
    <div className="staff-view v13-staff-flow">
      <section className="student-profile-strip staff-profile-strip" aria-label="Selected profile">
        <span>Working with</span>
        <strong>{selectedProfile?.name ?? "No profile selected"}</strong>
      </section>

      <WorkflowTabs
        tabs={staffTabs}
        activeTab={activeStaffTab}
        onChange={setActiveStaffTab}
        label="Staff tools"
      />

{activeStaffTab === "dashboard" ? (
  <>
    <StaffDashboardPanel
      selectedProfile={selectedProfile}
      activities={activities}
      dailyNote={dailyNote}
      supportEvents={supportEvents}
      weeklyProgressSummary={weeklyProgressSummary}
      hasUnsavedCloudChanges={hasUnsavedCloudChanges}
      syncMetadata={syncMetadata}
      onOpenStudentMode={onOpenStudentMode}
      onGoToTab={setActiveStaffTab}
    />

    <StaffReleaseReadinessPanel
      profiles={profiles}
      displaySettings={displaySettings}
      aacExpansionSettings={aacExpansionSettings}
      communicationSupportSettings={communicationSupportSettings}
      selfAdvocacySupportSettings={selfAdvocacySupportSettings}
      lifeSkillsSettings={lifeSkillsSettings}
      visualLibrary={visualLibrary}
      supportEvents={supportEvents}
    />

    <StaffFeatureGuidePanel onGoToTab={setActiveStaffTab} />
  </>
) : null}

{activeStaffTab === "setup" ? (
  <section className="staff-tab-screen" aria-labelledby="staff-setup-heading">
    <div className="focus-header compact-focus-header">
      <p className="eyebrow">Setup</p>
      <h2 id="staff-setup-heading">Guided setup</h2>
      <p>Use this path when setting up AccessFlow for a new student/client.</p>
    </div>

    <StaffSetupWizard
      selectedProfile={selectedProfile}
      activityBank={activityBank}
      activities={activities}
      onUpdateProfile={onUpdateProfile}
      onAddChoiceToBank={onAddChoiceToBank}
      onAddBankChoiceToSchedule={onAddBankChoiceToSchedule}
      onOpenStudentMode={onOpenStudentMode}
    />
  </section>
) : null}

      {activeStaffTab === "students" ? (
        <section className="staff-tab-screen" aria-labelledby="staff-students-heading">
          <div className="focus-header compact-focus-header">
            <p className="eyebrow">Students</p>
            <h2 id="staff-students-heading">Profile and settings</h2>
          </div>

          <div className="staff-management-grid">
            <FeaturePresetPanel
              selectedProfile={selectedProfile}
              onUpdateProfile={onUpdateProfile}
              onOpenStudentMode={onOpenStudentMode}
            />

            <StudentModePresetPanel
              selectedProfile={selectedProfile}
              displaySettings={displaySettings}
              onUpdateProfile={onUpdateProfile}
              onOpenStudentMode={onOpenStudentMode}
            />

            <ProfileManager
              profiles={profiles}
              selectedProfile={selectedProfile}
              selectedProfileId={selectedProfileId}
              onSelectProfile={onSelectProfile}
              onAddProfile={onAddProfile}
              onUpdateProfile={onUpdateProfile}
              onDeleteProfile={onDeleteProfile}
              displaySettings={displaySettings}
            />

            <StaffAboutMePanel
              aboutMeProfile={aboutMeProfile}
              onUpdateAboutMeProfile={onUpdateAboutMeProfile}
            />

            <StaffAlternativeAccessGuidePanel displaySettings={displaySettings} />

            <TemplateManager
              templates={templates}
              selectedProfile={selectedProfile}
              onSaveCurrentScheduleAsTemplate={onSaveCurrentScheduleAsTemplate}
              onApplyTemplateToProfile={onApplyTemplateToProfile}
              onDeleteTemplate={onDeleteTemplate}
            />

            <StaffTransitionSettingsPanel
              transitionSettings={transitionSettings}
              onUpdateTransitionSettings={onUpdateTransitionSettings}
            />

            <ProfileRecommendationsPanel
              displaySettings={displaySettings}
              accessibilityReview={accessibilityReview}
              transitionSettings={transitionSettings}
              reinforcementSettings={reinforcementSettings}
            />

            <StaffReinforcementPanel
              reinforcementSettings={reinforcementSettings}
              onUpdateReinforcementSettings={onUpdateReinforcementSettings}
            />

            <RegulationPlanPanel
              regulationPlan={regulationPlan}
              onUpdateRegulationPlan={onUpdateRegulationPlan}
            />

            <StaffVisualCoveragePanel
              aacExpansionSettings={aacExpansionSettings}
              communicationSupportSettings={communicationSupportSettings}
              selfAdvocacySupportSettings={selfAdvocacySupportSettings}
              lifeSkillsSettings={lifeSkillsSettings}
              onUpdateAacExpansionSettings={onUpdateAacExpansionSettings}
              onUpdateCommunicationSupportSettings={onUpdateCommunicationSupportSettings}
              onUpdateSelfAdvocacySupportSettings={onUpdateSelfAdvocacySupportSettings}
              onUpdateLifeSkillsSettings={onUpdateLifeSkillsSettings}
            />

            <StaffCommunicationSupportPanel
              communicationSupportSettings={communicationSupportSettings}
              visualLibrary={visualLibrary}
              onUpdateCommunicationSupportSettings={onUpdateCommunicationSupportSettings}
            />

            <StaffSelfAdvocacySupportPanel
              selfAdvocacySupportSettings={selfAdvocacySupportSettings}
              visualLibrary={visualLibrary}
              onUpdateSelfAdvocacySupportSettings={onUpdateSelfAdvocacySupportSettings}
            />

            <StaffAacExpansionPanel
              aacExpansionSettings={aacExpansionSettings}
              visualLibrary={visualLibrary}
              onUpdateAacExpansionSettings={onUpdateAacExpansionSettings}
            />

            <StaffLifeSkillsSettingsPanel
              lifeSkillsSettings={lifeSkillsSettings}
              visualLibrary={visualLibrary}
              onUpdateLifeSkillsSettings={onUpdateLifeSkillsSettings}
            />
          </div>
        </section>
      ) : null}

      {activeStaffTab === "choices" ? (
        <section className="staff-tab-screen" aria-labelledby="staff-choices-heading">
          <div className="focus-header compact-focus-header">
            <p className="eyebrow">Choices</p>
            <h2 id="staff-choices-heading">Board and choices</h2>
            <p>Build communication buttons and approved schedule activities.</p>
          </div>

          <ActivitySearchPanel
            activities={activities}
            activityBank={activityBank}
            onSelectActivity={onSelectActivity}
            onAddBankChoiceToSchedule={onAddBankChoiceToSchedule}
          />

          <StaffChoiceBoardManager
            boardItems={choiceBoardItems}
            onAddBoardItem={onAddBoardItem}
            onUpdateBoardItem={onUpdateBoardItem}
            onDeleteBoardItem={onDeleteBoardItem}
            onResetBoardItems={onResetBoardItems}
          />

          <StaffIconLibraryPanel onAddVisualLibraryItem={onAddVisualLibraryItem} />

          <StaffVisualLibraryPanel
            selectedProfile={selectedProfile}
            visualLibrary={visualLibrary}
            onAddVisualLibraryItem={onAddVisualLibraryItem}
            onUpdateVisualLibraryItem={onUpdateVisualLibraryItem}
            onDeleteVisualLibraryItem={onDeleteVisualLibraryItem}
            onResetVisualLibrary={onResetVisualLibrary}
          />

          <StaffChoiceBankPanel
            selectedProfile={selectedProfile}
            activityBank={activityBank}
            onAddChoiceToBank={onAddChoiceToBank}
            onUpdateBankChoice={onUpdateBankChoice}
            onAddBankChoiceToSchedule={onAddBankChoiceToSchedule}
            onDeleteBankChoice={onDeleteBankChoice}
          />

          <FirstThenBoardManager
            activityBank={activityBank}
            firstThenBoard={firstThenBoard}
            onUpdateFirstThenBoard={onUpdateFirstThenBoard}
            onAddFirstThenToSchedule={onAddFirstThenToSchedule}
          />
        </section>
      ) : null}

      {activeStaffTab === "schedule" ? (
        <section className="staff-tab-screen" aria-labelledby="staff-schedule-heading">
          <div className="focus-header compact-focus-header">
            <p className="eyebrow">Schedule</p>
            <h2 id="staff-schedule-heading">Today’s schedule</h2>
            <p>Add one-time activities or edit today’s assigned activities.</p>
          </div>

          <ScheduleDatePicker
            scheduleDate={scheduleDate}
            onScheduleDateChange={onScheduleDateChange}
          />

          <PrintSchedulePanel activities={activities} />

          <RoutineTemplatePanel
            onApplyDailyTemplate={onApplyDailyTemplate}
            onApplyCurrentScheduleToTomorrow={onApplyCurrentScheduleToTomorrow}
            onApplyCurrentScheduleToWeek={onApplyCurrentScheduleToWeek}
          />

          <DailyTemplateButtons onApplyDailyTemplate={onApplyDailyTemplate} />

          <ReviewQueuePanel
            activities={activities}
            onSelectActivity={onSelectActivity}
            onSaveActivityToBank={onSaveActivityToBank}
            onDismissReview={onDismissReview}
          />

          <AddActivityForm onAddActivity={onAddActivity} />

          <div className="workspace-grid staff-grid">
            <StaffActivityList
              activities={activities}
              selectedActivityId={selectedActivityId}
              onSelectActivity={onSelectActivity}
              onMoveActivity={onMoveActivity}
              onDeleteActivity={onDeleteActivity}
            />

            <StaffActivityEditor
              activity={selectedActivity}
              visualLibrary={visualLibrary}
              onSaveVisualToLibrary={onAddVisualLibraryItem}
              onUpdateActivity={onUpdateActivity}
              onUpdateStep={onUpdateStep}
              onAddStep={onAddStep}
              onDeleteStep={onDeleteStep}
              onMoveStep={onMoveStep}
              onSaveActivityToBank={onSaveActivityToBank}
              onDeleteActivity={onDeleteActivity}
            />
          </div>
        </section>
      ) : null}

      {activeStaffTab === "notes" ? (
        <section className="staff-tab-screen" aria-labelledby="staff-notes-heading">
          <div className="focus-header compact-focus-header">
            <p className="eyebrow">Notes</p>
            <h2 id="staff-notes-heading">Daily documentation</h2>
            <p>Write notes, log observations, update goals, and review accessibility supports.</p>
          </div>

          <StaffGoalPanel
            goals={progressGoals}
            activities={activities}
            activityBank={activityBank}
            onAddGoal={onAddGoal}
            onUpdateGoal={onUpdateGoal}
            onDeleteGoal={onDeleteGoal}
          />

          <AccessibilityReviewPanel
            accessibilityReview={accessibilityReview}
            onUpdateAccessibilityReview={onUpdateAccessibilityReview}
          />

          <SessionNoteWizardPanel onAddSessionNote={onAddSessionNote} />

          <StaffObservationLogPanel
            activities={activities}
            onAddSupportObservation={onAddSupportObservation}
          />

          <DocumentationPanel
            profile={selectedProfile}
            activities={activities}
            documentationDate={documentationDate}
            dailyNote={dailyNote}
            supportEvents={supportEvents}
            copyStatus={copyStatus}
            onDocumentationDateChange={onDocumentationDateChange}
            onUpdateDailyNote={onUpdateDailyNote}
            onCopyDailyNote={onCopyDailyNote}
            onDownloadDailyNote={onDownloadDailyNote}
            onDownloadActivityCsv={onDownloadActivityCsv}
          />

          <EventLogPanel events={supportEvents} />
        </section>
      ) : null}

      {activeStaffTab === "reports" ? (
        <section className="staff-tab-screen" aria-labelledby="staff-reports-heading">
          <div className="focus-header compact-focus-header">
            <p className="eyebrow">Reports</p>
            <h2 id="staff-reports-heading">Patterns and handoffs</h2>
            <p>Review weekly progress, support patterns, readiness, communication history, and handoff summaries.</p>
          </div>

          <WeeklyProgressPanel
            summary={weeklyProgressSummary}
            report={weeklyProgressReport}
            onDownloadWeeklyReport={onDownloadWeeklyReport}
          />

          <HandoffReportPanel
            handoffReport={handoffReport}
            onDownloadHandoffReport={onDownloadHandoffReport}
          />

          <CommunicationHistoryPanel supportEvents={supportEvents} />

          <ActivitySupportPatternPanel
            activities={activities}
            supportEvents={supportEvents}
            supportObservations={supportObservations}
          />

          <ActivityReadinessReviewPanel
            activities={activities}
            supportEvents={supportEvents}
            supportObservations={supportObservations}
          />

          <TryAgainLaterQueuePanel supportEvents={supportEvents} />

          <GoalSupportRecommendationsPanel
            supportEvents={supportEvents}
            progressGoals={progressGoals}
          />

          <CaregiverHandoffPanel
            selectedProfile={selectedProfile}
            lifeSkillsSettings={lifeSkillsSettings}
          />

          <AboutMeExportPanel
            selectedProfile={selectedProfile}
            aboutMeProfile={aboutMeProfile}
          />
        </section>
      ) : null}

      {activeStaffTab === "save" ? (
        <section className="staff-tab-screen" aria-labelledby="staff-save-heading">
          <div className="focus-header compact-focus-header">
            <p className="eyebrow">Save</p>
            <h2 id="staff-save-heading">Account, cloud, and export</h2>
          </div>

          <PrototypeWarningPanel />

          <div className="staff-management-grid">
            <DataHealthPanel
              dataHealth={dataHealth}
              onDownloadNormalizedExport={onDownloadNormalizedExport}
            />

            <BackendArchitecturePanel />

            <BackendNormalizationStartPanel dataHealth={dataHealth} />

            <ComplianceReadinessPanel />

            <AuthPanel
              session={session}
              authStatus={authStatus}
              isAuthWorking={isAuthWorking}
              onSignIn={onSignIn}
              onSignUp={onSignUp}
              onGoogleSignIn={onGoogleSignIn}
              onSignOut={onSignOut}
            />

            <SupabaseSyncPanel
              session={session}
              syncStatus={syncStatus}
              isSyncing={isSyncing}
              syncMetadata={syncMetadata}
              hasUnsavedCloudChanges={hasUnsavedCloudChanges}
              syncReminder={syncReminder}
              onSaveCloudSnapshot={onSaveCloudSnapshot}
              onLoadCloudSnapshot={onLoadCloudSnapshot}
            />
          </div>

          <StaffSecurityPanel
            staffSecurity={staffSecurity}
            onUpdateStaffSecurity={onUpdateStaffSecurity}
            onLockStaff={onLockStaff}
          />

          <RolePermissionsPanel
            rolePermissions={rolePermissions}
            onUpdateRolePermissions={onUpdateRolePermissions}
          />

          <ExportUpgradePanel
            onDownloadGoalCsv={onDownloadGoalCsv}
            onDownloadSupportEventCsv={onDownloadSupportEventCsv}
            onDownloadPromptCsv={onDownloadPromptCsv}
            onExportSingleProfile={onExportSingleProfile}
          />

          <DataManagementPanel
            exportStatus={exportStatus}
            importStatus={importStatus}
            onExportBackup={onExportBackup}
            onImportBackup={onImportBackup}
          />

          <section className="panel controls-panel" aria-label="Schedule controls">
            <button type="button" className="secondary-button" onClick={onResetDemo}>
              Reset demo data
            </button>
            <button type="button" className="danger-button" onClick={onClearSchedule}>
              Clear selected profile schedule
            </button>
          </section>
        </section>
      ) : null}

      <PrototypeSafetyFooter mode="staff" />
    </div>
  );
}
