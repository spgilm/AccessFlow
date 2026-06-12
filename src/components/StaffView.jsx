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
import StaffActivityEditor from "./StaffActivityEditor.jsx";
import StaffActivityList from "./StaffActivityList.jsx";
import StaffChoiceBankPanel from "./StaffChoiceBankPanel.jsx";
import SupabaseSyncPanel from "./SupabaseSyncPanel.jsx";
import TemplateManager from "./TemplateManager.jsx";

const staffTabs = [
  { id: "setup", label: "Setup" },
  { id: "students", label: "Students" },
  { id: "choices", label: "Choices" },
  { id: "schedule", label: "Schedule" },
  { id: "notes", label: "Notes" },
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
  const [activeStaffTab, setActiveStaffTab] = useState("setup");

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

            <TemplateManager
              templates={templates}
              selectedProfile={selectedProfile}
              onSaveCurrentScheduleAsTemplate={onSaveCurrentScheduleAsTemplate}
              onApplyTemplateToProfile={onApplyTemplateToProfile}
              onDeleteTemplate={onDeleteTemplate}
            />
          </div>
        </section>
      ) : null}

      {activeStaffTab === "choices" ? (
        <section className="staff-tab-screen" aria-labelledby="staff-choices-heading">
          <div className="focus-header compact-focus-header">
            <p className="eyebrow">Choices</p>
            <h2 id="staff-choices-heading">Reusable activities</h2>
            <p>Build the activities the student can choose from.</p>
          </div>

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
            <h2 id="staff-notes-heading">Progress documentation</h2>
          </div>

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

      {activeStaffTab === "save" ? (
        <section className="staff-tab-screen" aria-labelledby="staff-save-heading">
          <div className="focus-header compact-focus-header">
            <p className="eyebrow">Save</p>
            <h2 id="staff-save-heading">Account, cloud, and export</h2>
          </div>

          <div className="staff-management-grid">
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
    </div>
  );
}
