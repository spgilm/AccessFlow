/**
 * Main application coordinator. Owns global state, selected profile, selected date, auth session, cloud sync, and all handlers passed into student/staff screens.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useMemo, useState } from "react";
import ModeToggle from "./components/ModeToggle.jsx";
import StaffView from "./components/StaffView.jsx";
import StaffAuthGate from "./components/StaffAuthGate.jsx";
import StudentView from "./components/StudentView.jsx";
import { starterProfiles } from "./data/starterProfiles.js";
import { getIndependenceSettings } from "./data/independenceSettings.js";
import { getDisplaySettings } from "./data/displaySettings.js";
import { getChoiceBoardItems } from "./data/choiceBoardItems.js";
import { getVisualLibraryItems } from "./data/visualLibrary.js";
import { getProgressGoals } from "./data/progressGoals.js";
import { getTransitionSettings } from "./data/transitionSettings.js";
import { getStaffSecurity } from "./data/securitySettings.js";
import { getRolePermissions } from "./data/rolePermissions.js";
import { getReinforcementSettings } from "./data/reinforcementSettings.js";
import { getRegulationPlan } from "./data/regulationPlan.js";
import { getCommunicationSupportSettings } from "./data/communicationSupport.js";
import { getSelfAdvocacySupportSettings } from "./data/selfAdvocacySupport.js";
import { getLifeSkillsSettings } from "./data/lifeSkillsSettings.js";
import { getAboutMeProfile } from "./data/aboutMeProfile.js";
import { getAacExpansionSettings } from "./data/aacExpansion.js";
import { buildHandoffReport } from "./utils/handoffReport.js";
import { analyzeWorkspaceData } from "./utils/dataHealth.js";
import { starterTemplates } from "./data/starterTemplates.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { useThemeEffect } from "./hooks/useThemeEffect.js";
import { useReadAloudEffect } from "./hooks/useReadAloudEffect.js";
import { useLegacyStudentViewMigration } from "./hooks/useLegacyStudentViewMigration.js";
import { useSupabaseSessionEffect } from "./hooks/useSupabaseSessionEffect.js";
import { useWorkspaceDirtyState } from "./hooks/useWorkspaceDirtyState.js";
import { useScheduleCopyActions } from "./hooks/useScheduleCopyActions.js";
import { useStaffExportActions } from "./hooks/useStaffExportActions.js";
import { useProgressGoalActions } from "./hooks/useProgressGoalActions.js";
import { useVisualLibraryActions } from "./hooks/useVisualLibraryActions.js";
import { useSupportPlanActions } from "./hooks/useSupportPlanActions.js";
import { useAuthActions } from "./hooks/useAuthActions.js";
import { useProfileActions } from "./hooks/useProfileActions.js";
import { useModeDateActions } from "./hooks/useModeDateActions.js";
import { useBoardActions } from "./hooks/useBoardActions.js";
import { useDailyDocumentationActions } from "./hooks/useDailyDocumentationActions.js";
import { useCloudSnapshotActions } from "./hooks/useCloudSnapshotActions.js";
import { useScheduleActivityActions } from "./hooks/useScheduleActivityActions.js";
import { useActivityBankActions } from "./hooks/useActivityBankActions.js";
import { useTemplateActions } from "./hooks/useTemplateActions.js";
import { useStaffSettingsActions } from "./hooks/useStaffSettingsActions.js";
import { useFirstThenActions } from "./hooks/useFirstThenActions.js";




import { getDailyNote, getTodayDateKey } from "./utils/documentationHelpers.js";
import { getScheduleForDate, updateProfileScheduleForDate } from "./utils/scheduleDateHelpers.js";
import { buildWeeklyProgressReport, buildWeeklyProgressSummary } from "./utils/progressDashboard.js";
import { createId } from "./utils/formatters.js";
import {
  confirmMajorStudentAction as confirmStudentActionWithSettings,
  playStudentAudioFeedback as playStudentAudioFeedbackWithSettings,
} from "./utils/studentActionHelpers.js";


const PROFILES_STORAGE_KEY = "accessflow.profiles.v5";
const SELECTED_PROFILE_STORAGE_KEY = "accessflow.selectedProfile.v5";
const TEMPLATES_STORAGE_KEY = "accessflow.templates.v5";
const MODE_STORAGE_KEY = "accessflow.mode.v5";
const STUDENT_VIEW_STORAGE_KEY = "accessflow.studentView.v5";
const DOCUMENTATION_DATE_STORAGE_KEY = "accessflow.documentationDate.v5";
const SCHEDULE_DATE_STORAGE_KEY = "accessflow.scheduleDate.v15";
const SYNC_METADATA_STORAGE_KEY = "accessflow.syncMetadata.v9";
const THEME_STORAGE_KEY = "accessflow.theme.v10";
const TEXT_TO_SPEECH_STORAGE_KEY = "accessflow.textToSpeech.v14";
const ENABLE_GOOGLE_AUTH = import.meta.env.VITE_ENABLE_GOOGLE_AUTH === "true";
const STAFF_SECURITY_STORAGE_KEY = "accessflow.staffSecurity.v20";
const ROLE_PERMISSIONS_STORAGE_KEY = "accessflow.rolePermissions.v20";

export default function App() {
  const [profiles, setProfiles] = useLocalStorage(PROFILES_STORAGE_KEY, starterProfiles);
  const [selectedProfileId, setSelectedProfileId] = useLocalStorage(
    SELECTED_PROFILE_STORAGE_KEY,
    starterProfiles[0]?.id ?? null
  );
  const [templates, setTemplates] = useLocalStorage(TEMPLATES_STORAGE_KEY, starterTemplates);
  const [mode, setMode] = useLocalStorage(MODE_STORAGE_KEY, "student");
  const [theme, setTheme] = useLocalStorage(THEME_STORAGE_KEY, "light");
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useLocalStorage(TEXT_TO_SPEECH_STORAGE_KEY, false);
  const [studentViewMode, setStudentViewMode] = useLocalStorage(
    STUDENT_VIEW_STORAGE_KEY,
    "schedule"
  );
  const [documentationDate, setDocumentationDate] = useLocalStorage(
    DOCUMENTATION_DATE_STORAGE_KEY,
    getTodayDateKey()
  );
  const [scheduleDate, setScheduleDate] = useLocalStorage(
    SCHEDULE_DATE_STORAGE_KEY,
    getTodayDateKey()
  );
  const [selectedActivityId, setSelectedActivityId] = useState(
    starterProfiles[0]?.activities[0]?.id ?? null
  );
  const [announcement, setAnnouncement] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [exportStatus, setExportStatus] = useState("");
  const [importStatus, setImportStatus] = useState("");
  const [syncStatus, setSyncStatus] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [session, setSession] = useState(null);
  const [authStatus, setAuthStatus] = useState("");
  const [isAuthWorking, setIsAuthWorking] = useState(false);
  const [syncMetadata, setSyncMetadata] = useLocalStorage(SYNC_METADATA_STORAGE_KEY, {
    lastSavedAt: null,
    lastLoadedAt: null,
    lastSnapshotId: null,
  });
  const [staffSecurity, setStaffSecurity] = useLocalStorage(STAFF_SECURITY_STORAGE_KEY, getStaffSecurity());
  const [rolePermissions, setRolePermissions] = useLocalStorage(ROLE_PERMISSIONS_STORAGE_KEY, getRolePermissions());
  const [staffUnlocked, setStaffUnlocked] = useState(false);

  const selectedProfile = useMemo(() => {
    return profiles.find((profile) => profile.id === selectedProfileId) ?? profiles[0] ?? null;
  }, [profiles, selectedProfileId]);

  const activities = getScheduleForDate(selectedProfile, scheduleDate);
  const activityBank = selectedProfile?.activityBank ?? [];
  const choiceBoardItems = getChoiceBoardItems(selectedProfile);
  const visualLibrary = getVisualLibraryItems(selectedProfile);
  const progressGoals = getProgressGoals(selectedProfile);
  const supportEvents = selectedProfile?.supportEvents ?? [];
  const firstThenBoard = selectedProfile?.firstThenBoard ?? { firstChoiceId: "", thenChoiceId: "" };
  const displaySettings = getDisplaySettings(selectedProfile);
  const transitionSettings = getTransitionSettings(selectedProfile);
  const accessibilityReview = selectedProfile?.accessibilityReview ?? {};
  const reinforcementSettings = getReinforcementSettings(selectedProfile);
  const regulationPlan = getRegulationPlan(selectedProfile);
  const communicationSupportSettings = getCommunicationSupportSettings(selectedProfile);
  const selfAdvocacySupportSettings = getSelfAdvocacySupportSettings(selectedProfile);
  const lifeSkillsSettings = getLifeSkillsSettings(selectedProfile);
  const aboutMeProfile = getAboutMeProfile(selectedProfile);
  const aacExpansionSettings = getAacExpansionSettings(selectedProfile);
  const supportObservations = selectedProfile?.supportObservations ?? [];
  const checkIns = selectedProfile?.checkIns ?? [];
  const sessionNotes = selectedProfile?.sessionNotes ?? [];
  const safeStaffSecurity = getStaffSecurity(staffSecurity);
  const safeRolePermissions = getRolePermissions(rolePermissions);

  const selectedActivity = useMemo(
    () => activities.find((activity) => activity.id === selectedActivityId) ?? null,
    [activities, selectedActivityId]
  );

  const dailyNote = useMemo(
    () => getDailyNote(selectedProfile, documentationDate),
    [selectedProfile, documentationDate]
  );

  const weeklyProgressSummary = useMemo(
    () => buildWeeklyProgressSummary(selectedProfile, documentationDate, progressGoals),
    [selectedProfile, documentationDate, progressGoals]
  );

  const weeklyProgressReport = useMemo(
    () => buildWeeklyProgressReport(selectedProfile, documentationDate, progressGoals),
    [selectedProfile, documentationDate, progressGoals]
  );

  const handoffReport = useMemo(
    () =>
      buildHandoffReport({
        profile: selectedProfile,
        activities,
        dailyNote,
        supportEvents,
        progressGoals,
        checkIns,
        regulationPlan,
      }),
    [selectedProfile, activities, dailyNote, supportEvents, progressGoals, checkIns, regulationPlan]
  );

  const workspaceData = useMemo(
    () => ({
      profiles,
      templates,
      selectedProfileId: selectedProfile?.id ?? selectedProfileId,
      documentationDate,
      scheduleDate,
      mode,
      studentViewMode,
    }),
    [profiles, templates, selectedProfile?.id, selectedProfileId, documentationDate, scheduleDate, mode, studentViewMode]
  );

  const dataHealth = useMemo(
    () => analyzeWorkspaceData({ profiles, templates }),
    [profiles, templates]
  );

  const workspaceDataFingerprint = useMemo(
    () => JSON.stringify(workspaceData),
    [workspaceData]
  );

  useLegacyStudentViewMigration(studentViewMode, setStudentViewMode);
  useThemeEffect(theme);
  useReadAloudEffect(textToSpeechEnabled);

  const {
    hasUnsavedCloudChanges,
    syncReminder,
    markWorkspaceClean,
    markNextWorkspaceClean,
    markWorkspaceDirty,
  } = useWorkspaceDirtyState(workspaceDataFingerprint);

  const lastSessionUserIdRef = useSupabaseSessionEffect({
    setSession,
    setAuthStatus,
    setMode,
    setAnnouncement,
  });


function getStudentDisplaySettings() {
  return getDisplaySettings(selectedProfile);
}

function confirmMajorStudentAction(message) {
  return confirmStudentActionWithSettings(getStudentDisplaySettings(), message);
}

function playStudentAudioFeedback(message) {
  playStudentAudioFeedbackWithSettings(getStudentDisplaySettings(), message);
}

  function updateSelectedProfile(updater) {
    if (!selectedProfile) {
      return;
    }

    setProfiles((currentProfiles) =>
      currentProfiles.map((profile) =>
        profile.id === selectedProfile.id ? updater(profile) : profile
      )
    );
  }

  function updateSelectedProfileActivities(updater) {
    updateSelectedProfile((profile) => updateProfileScheduleForDate(profile, scheduleDate, updater));
  }



  function clearPortableStatuses() {
    setCopyStatus("");
    setExportStatus("");
    setImportStatus("");
    setSyncStatus("");
  }

  const {
    handleSignUp,
    handleGoogleSignIn,
    handleSignIn,
    handleSignOut,
  } = useAuthActions({
    setIsAuthWorking,
    setAuthStatus,
    setSession,
    lastSessionUserIdRef,
    setMode,
    setAnnouncement,
    setSyncStatus,
  });

  const {
    handleSelectProfile,
    handleAddProfile,
    handleUpdateProfile,
    handleDeleteProfile,
    handleResetDemo,
  } = useProfileActions({
    profiles,
    selectedProfileId,
    setProfiles,
    setTemplates,
    setSelectedProfileId,
    setSelectedActivityId,
    setDocumentationDate,
    clearPortableStatuses,
    setAnnouncement,
  });

  const {
    handleModeChange,
    handleThemeChange,
    handleStudentViewModeChange,
    handleScheduleDateChange,
    handleDocumentationDateChange,
  } = useModeDateActions({
    selectedProfile,
    safeStaffSecurity,
    staffUnlocked,
    setStaffUnlocked,
    setMode,
    setTheme,
    setStudentViewMode,
    setScheduleDate,
    setDocumentationDate,
    setSelectedActivityId,
    clearPortableStatuses,
    setAnnouncement,
  });

  const {
    handleAddBoardItem,
    handleUpdateBoardItem,
    handleDeleteBoardItem,
    handleResetBoardItems,
  } = useBoardActions({
    updateSelectedProfile,
    clearPortableStatuses,
    setAnnouncement,
  });

  const {
    handleUpdateDailyNote,
    handleCopyDailyNote,
    handleDownloadDailyNote,
    handleDownloadActivityCsv,
  } = useDailyDocumentationActions({
    selectedProfile,
    activities,
    dailyNote,
    supportEvents,
    documentationDate,
    updateSelectedProfile,
    clearPortableStatuses,
    setCopyStatus,
  });

  const {
    handleExportBackup,
    handleImportBackup,
    handleSaveCloudSnapshot,
    handleLoadCloudSnapshot,
  } = useCloudSnapshotActions({
    workspaceData,
    workspaceDataFingerprint,
    setProfiles,
    setTemplates,
    setSelectedProfileId,
    setDocumentationDate,
    setScheduleDate,
    setMode,
    setStudentViewMode,
    setSelectedActivityId,
    setCopyStatus,
    setExportStatus,
    setImportStatus,
    setSyncStatus,
    setIsSyncing,
    setAnnouncement,
    setSyncMetadata,
    markWorkspaceClean,
    markNextWorkspaceClean,
    markWorkspaceDirty,
  });

  const {
    handleAddActivity,
    handleStudentAddActivity,
    handleApplyDailyTemplate,
    handleSelectActivity,
    handleToggleActivityComplete,
    handleToggleStep,
    handleMoveActivity,
    handleStudentMoveActivity,
    handleStudentRemoveActivity,
    handleUpdateActivity,
    handleUpdateStep,
    handleUpdateStepPrompt,
    handleDismissReview,
    handleAddStep,
    handleDeleteStep,
    handleMoveStep,
    handleDeleteActivity,
    handleClearSchedule,
    handleStudentClearSchedule,
  } = useScheduleActivityActions({
    selectedProfile,
    activities,
    activityBank,
    scheduleDate,
    selectedActivityId,
    setSelectedActivityId,
    updateSelectedProfileActivities,
    clearPortableStatuses,
    setAnnouncement,
    confirmMajorStudentAction,
    playStudentAudioFeedback,
  });

  const {
    handleAddChoiceToBank,
    handleUpdateBankChoice,
    handleSaveActivityToBank,
    handleAddBankChoiceToSchedule,
    handleDeleteBankChoice,
  } = useActivityBankActions({
    selectedProfile,
    activities,
    activityBank,
    updateSelectedProfile,
    updateSelectedProfileActivities,
    handleUpdateActivity,
    setSelectedActivityId,
    clearPortableStatuses,
    setAnnouncement,
  });

  const {
    handleSaveCurrentScheduleAsTemplate,
    handleApplyTemplateToProfile,
    handleDeleteTemplate,
  } = useTemplateActions({
    selectedProfile,
    templates,
    setTemplates,
    updateSelectedProfile,
    setSelectedActivityId,
    clearPortableStatuses,
    setAnnouncement,
  });

  const {
    handleUpdateTransitionSettings,
    handleUpdateAccessibilityReview,
    handleUpdateStaffSecurity,
    handleLockStaff,
    handleUpdateRolePermissions,
  } = useStaffSettingsActions({
    updateSelectedProfile,
    clearPortableStatuses,
    setStaffSecurity,
    setRolePermissions,
    setStaffUnlocked,
    setMode,
    setAnnouncement,
  });

  const {
    handleUpdateFirstThenBoard,
    handleAddFirstThenToSchedule,
  } = useFirstThenActions({
    firstThenBoard,
    activityBank,
    selectedProfile,
    selectedActivityId,
    updateSelectedProfile,
    updateSelectedProfileActivities,
    setSelectedActivityId,
    clearPortableStatuses,
    setAnnouncement,
  });

  
  
  function recordSupportEvent(event) {
    if (!selectedProfile) {
      return;
    }

    const nextEvent = {
      id: createId("support-event"),
      type: event.type,
      label: event.label,
      activityId: event.activityId ?? null,
      activityLabel: event.activityLabel ?? null,
      createdAt: new Date().toISOString(),
      date: getTodayDateKey(),
    };

    updateSelectedProfile((profile) => ({
      ...profile,
      supportEvents: [...(profile.supportEvents ?? []), nextEvent],
    }));

    clearPortableStatuses();
    setAnnouncement(`${event.label} recorded.`);
  }


const {
  handleApplyCurrentScheduleToTomorrow,
  handleApplyCurrentScheduleToWeek,
} = useScheduleCopyActions({
  scheduleDate,
  activities,
  updateSelectedProfile,
  clearPortableStatuses,
  setAnnouncement,
});

const {
  handleDownloadWeeklyReport,
  handleDownloadHandoffReport,
  handleDownloadNormalizedExport,
  handleDownloadGoalCsv,
  handleDownloadSupportEventCsv,
  handleDownloadPromptCsv,
  handleExportSingleProfile,
} = useStaffExportActions({
  selectedProfile,
  progressGoals,
  supportEvents,
  weeklyProgressSummary,
  weeklyProgressReport,
  handoffReport,
  profiles,
  templates,
  setCopyStatus,
  setExportStatus,
});

const {
  handleAddGoal,
  handleUpdateGoal,
  handleDeleteGoal,
} = useProgressGoalActions({
  updateSelectedProfile,
  clearPortableStatuses,
  setAnnouncement,
});

const {
  handleAddVisualLibraryItem,
  handleUpdateVisualLibraryItem,
  handleDeleteVisualLibraryItem,
  handleResetVisualLibrary,
} = useVisualLibraryActions({
  updateSelectedProfile,
  clearPortableStatuses,
  setAnnouncement,
});

const {
  handleRecordCheckIn,
  handleUpdateReinforcementSettings,
  handleRequestReward,
  handleUpdateRegulationPlan,
  handleUpdateCommunicationSupportSettings,
  handleUpdateSelfAdvocacySupportSettings,
  handleUpdateLifeSkillsSettings,
  handleUpdateAacExpansionSettings,
  handleUpdateAboutMeProfile,
  handleAddSupportObservation,
  handleAddSessionNote,
} = useSupportPlanActions({
  documentationDate,
  updateSelectedProfile,
  recordSupportEvent,
  clearPortableStatuses,
  setAnnouncement,
});

  
  
  
  
  
  
  
  
  
  return (
    <main id="accessflow-main" className="app-shell">
      <a className="skip-link" href="#accessflow-content">Skip to main content</a>
      <header className="app-header">
        <div>
          <p className="app-kicker">Adaptive visual schedule</p>
          <h1>AccessFlow</h1>
          <p className="app-description">
            Build independence with student-planned visual schedules, step-by-step supports, staff documentation, and optional cloud snapshots.
          </p>
        </div>

        <ModeToggle
          mode={mode}
          onModeChange={handleModeChange}
          theme={theme}
          onThemeChange={handleThemeChange}
          textToSpeechEnabled={textToSpeechEnabled}
          onTextToSpeechChange={(enabled) => {
            setTextToSpeechEnabled(enabled);
            setAnnouncement(enabled ? "Read aloud on." : "Read aloud off.");
          }}
          textToSpeechAvailable={typeof window !== "undefined" && Boolean(window.speechSynthesis)}
          hideStaffSwitch={mode === "student" && safeStaffSecurity.hideStaffSwitchInStudentMode}
        />
      </header>

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      <div id="accessflow-content" tabIndex="-1">
      {mode === "student" ? (
        <StudentView
          profile={selectedProfile}
          activities={activities}
          selectedActivity={selectedActivity}
          selectedActivityId={selectedActivityId}
          scheduleDate={scheduleDate}
          onScheduleDateChange={handleScheduleDateChange}
          studentViewMode={studentViewMode}
          studentActivityLibrary={activityBank}
          choiceBoardItems={choiceBoardItems}
          independenceSettings={getIndependenceSettings(selectedProfile)}
          displaySettings={displaySettings}
          transitionSettings={transitionSettings}
          reinforcementSettings={reinforcementSettings}
          communicationSupportSettings={communicationSupportSettings}
          selfAdvocacySupportSettings={selfAdvocacySupportSettings}
          lifeSkillsSettings={lifeSkillsSettings}
          aboutMeProfile={aboutMeProfile}
          aacExpansionSettings={aacExpansionSettings}
          hideStaffAccess={safeStaffSecurity.hideStaffSwitchInStudentMode}
          supportEvents={supportEvents}
          onStudentViewModeChange={handleStudentViewModeChange}
          onSelectActivity={handleSelectActivity}
          onToggleActivityComplete={handleToggleActivityComplete}
          onToggleStep={handleToggleStep}
          onUpdateActivityVisual={(activityId, visual) => handleUpdateActivity(activityId, { visual })}
          onUpdateStepVisual={(activityId, stepId, visual) => handleUpdateStep(activityId, stepId, { visual })}
          onUpdateStepPrompt={handleUpdateStepPrompt}
          onStudentAddActivity={handleStudentAddActivity}
          onSupportRequest={recordSupportEvent}
          onRecordCheckIn={handleRecordCheckIn}
          onRequestReward={handleRequestReward}
          onMoveActivity={handleStudentMoveActivity}
          onRemoveActivity={handleStudentRemoveActivity}
          onStudentClearSchedule={handleStudentClearSchedule}
          onCloseDetail={() => setSelectedActivityId(null)}
          session={session}
          authStatus={authStatus}
          isAuthWorking={isAuthWorking}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
          onGoogleSignIn={ENABLE_GOOGLE_AUTH ? handleGoogleSignIn : null}
          onSignOut={handleSignOut}
          onOpenStaffMode={() => handleModeChange("staff")}
        />
      ) : session ? (
        <StaffView
          profiles={profiles}
          selectedProfile={selectedProfile}
          selectedProfileId={selectedProfile?.id ?? selectedProfileId}
          templates={templates}
          activities={activities}
          activityBank={activityBank}
          choiceBoardItems={choiceBoardItems}
          visualLibrary={visualLibrary}
          progressGoals={progressGoals}
          weeklyProgressSummary={weeklyProgressSummary}
          weeklyProgressReport={weeklyProgressReport}
          transitionSettings={transitionSettings}
          accessibilityReview={accessibilityReview}
          staffSecurity={safeStaffSecurity}
          rolePermissions={safeRolePermissions}
          reinforcementSettings={reinforcementSettings}
          communicationSupportSettings={communicationSupportSettings}
          selfAdvocacySupportSettings={selfAdvocacySupportSettings}
          lifeSkillsSettings={lifeSkillsSettings}
          aboutMeProfile={aboutMeProfile}
          aacExpansionSettings={aacExpansionSettings}
          supportObservations={supportObservations}
          regulationPlan={regulationPlan}
          handoffReport={handoffReport}
          dataHealth={dataHealth}
          sessionNotes={sessionNotes}
          supportEvents={supportEvents}
          firstThenBoard={firstThenBoard}
          displaySettings={displaySettings}
          selectedActivity={selectedActivity}
          selectedActivityId={selectedActivityId}
          scheduleDate={scheduleDate}
          onScheduleDateChange={handleScheduleDateChange}
          documentationDate={documentationDate}
          dailyNote={dailyNote}
          copyStatus={copyStatus}
          exportStatus={exportStatus}
          importStatus={importStatus}
          syncStatus={syncStatus}
          isSyncing={isSyncing}
          syncMetadata={syncMetadata}
          hasUnsavedCloudChanges={hasUnsavedCloudChanges}
          syncReminder={syncReminder}
          session={session}
          authStatus={authStatus}
          isAuthWorking={isAuthWorking}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
          onGoogleSignIn={ENABLE_GOOGLE_AUTH ? handleGoogleSignIn : null}
          onSignOut={handleSignOut}
          onDocumentationDateChange={handleDocumentationDateChange}
          onUpdateDailyNote={handleUpdateDailyNote}
          onCopyDailyNote={handleCopyDailyNote}
          onDownloadDailyNote={handleDownloadDailyNote}
          onDownloadActivityCsv={handleDownloadActivityCsv}
          onExportBackup={handleExportBackup}
          onImportBackup={handleImportBackup}
          onSaveCloudSnapshot={handleSaveCloudSnapshot}
          onLoadCloudSnapshot={handleLoadCloudSnapshot}
          onSelectProfile={handleSelectProfile}
          onAddProfile={handleAddProfile}
          onUpdateProfile={handleUpdateProfile}
          onDeleteProfile={handleDeleteProfile}
          onDismissReview={handleDismissReview}
          onUpdateFirstThenBoard={handleUpdateFirstThenBoard}
          onAddFirstThenToSchedule={handleAddFirstThenToSchedule}
          onApplyDailyTemplate={handleApplyDailyTemplate}
          onOpenStudentMode={() => handleModeChange("student")}
          onSaveCurrentScheduleAsTemplate={handleSaveCurrentScheduleAsTemplate}
          onApplyTemplateToProfile={handleApplyTemplateToProfile}
          onDeleteTemplate={handleDeleteTemplate}
          onAddActivity={handleAddActivity}
          onAddChoiceToBank={handleAddChoiceToBank}
          onAddBoardItem={handleAddBoardItem}
          onAddVisualLibraryItem={handleAddVisualLibraryItem}
          onAddGoal={handleAddGoal}
          onUpdateGoal={handleUpdateGoal}
          onDeleteGoal={handleDeleteGoal}
          onDownloadWeeklyReport={handleDownloadWeeklyReport}
          onUpdateTransitionSettings={handleUpdateTransitionSettings}
          onUpdateReinforcementSettings={handleUpdateReinforcementSettings}
          onUpdateRegulationPlan={handleUpdateRegulationPlan}
          onUpdateCommunicationSupportSettings={handleUpdateCommunicationSupportSettings}
          onUpdateSelfAdvocacySupportSettings={handleUpdateSelfAdvocacySupportSettings}
          onUpdateLifeSkillsSettings={handleUpdateLifeSkillsSettings}
          onUpdateAacExpansionSettings={handleUpdateAacExpansionSettings}
          onUpdateAboutMeProfile={handleUpdateAboutMeProfile}
          onAddSupportObservation={handleAddSupportObservation}
          onAddSessionNote={handleAddSessionNote}
          onDownloadHandoffReport={handleDownloadHandoffReport}
          onDownloadNormalizedExport={handleDownloadNormalizedExport}
          onUpdateAccessibilityReview={handleUpdateAccessibilityReview}
          onUpdateStaffSecurity={handleUpdateStaffSecurity}
          onLockStaff={handleLockStaff}
          onUpdateRolePermissions={handleUpdateRolePermissions}
          onApplyCurrentScheduleToTomorrow={handleApplyCurrentScheduleToTomorrow}
          onApplyCurrentScheduleToWeek={handleApplyCurrentScheduleToWeek}
          onDownloadGoalCsv={handleDownloadGoalCsv}
          onDownloadSupportEventCsv={handleDownloadSupportEventCsv}
          onDownloadPromptCsv={handleDownloadPromptCsv}
          onExportSingleProfile={handleExportSingleProfile}
          onUpdateVisualLibraryItem={handleUpdateVisualLibraryItem}
          onDeleteVisualLibraryItem={handleDeleteVisualLibraryItem}
          onResetVisualLibrary={handleResetVisualLibrary}
          onUpdateBoardItem={handleUpdateBoardItem}
          onDeleteBoardItem={handleDeleteBoardItem}
          onResetBoardItems={handleResetBoardItems}
          onUpdateBankChoice={handleUpdateBankChoice}
          onSaveActivityToBank={handleSaveActivityToBank}
          onAddBankChoiceToSchedule={handleAddBankChoiceToSchedule}
          onDeleteBankChoice={handleDeleteBankChoice}
          onSelectActivity={handleSelectActivity}
          onMoveActivity={handleMoveActivity}
          onUpdateActivity={handleUpdateActivity}
          onUpdateStep={handleUpdateStep}
          onAddStep={handleAddStep}
          onDeleteStep={handleDeleteStep}
          onMoveStep={handleMoveStep}
          onDeleteActivity={handleDeleteActivity}
          onResetDemo={handleResetDemo}
          onClearSchedule={handleClearSchedule}
        />
      ) : (
        <StaffAuthGate
          session={session}
          authStatus={authStatus}
          isAuthWorking={isAuthWorking}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
          onGoogleSignIn={ENABLE_GOOGLE_AUTH ? handleGoogleSignIn : null}
          onSignOut={handleSignOut}
          onOpenStudentMode={() => handleModeChange("student")}
        />
      )}
      </div>
    </main>
  );
}
