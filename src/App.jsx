/**
 * Main application coordinator. Owns global state, selected profile, selected date, auth session, cloud sync, and all handlers passed into student/staff screens.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import ModeToggle from "./components/ModeToggle.jsx";
import StaffView from "./components/StaffView.jsx";
import StudentView from "./components/StudentView.jsx";
import { starterProfiles, createBlankProfile } from "./data/starterProfiles.js";
import { getIndependenceSettings } from "./data/independenceSettings.js";
import { getDisplaySettings } from "./data/displaySettings.js";
import { starterTemplates } from "./data/starterTemplates.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { generateActivityFromTask } from "./services/taskGenerator.js";
import { areAllStepsComplete, moveItemById, updateActivityById } from "./utils/activityHelpers.js";
import {
  buildDailyProgressNote,
  createBlankDailyNote,
  getDailyNote,
  getTodayDateKey,
} from "./utils/documentationHelpers.js";
import {
  buildActivityCsv,
  buildBackupPayload,
  buildSafeFilename,
  downloadTextFile,
  validateBackupPayload,
} from "./utils/exportHelpers.js";
import { normalizeImportedBackupData } from "./utils/importHelpers.js";
import { getScheduleForDate, updateProfileScheduleForDate } from "./utils/scheduleDateHelpers.js";
import {
  getCurrentSession,
  isSupabaseConfigured,
  loadLatestWorkspaceSnapshot,
  saveWorkspaceSnapshot,
  signInWithEmail,
  signInWithGoogle,
  signOut,
  signUpWithEmail,
  subscribeToAuthChanges,
} from "./services/supabaseWorkspace.js";
import { createId } from "./utils/formatters.js";
import { cloneActivitiesForProfile, cloneActivitiesForTemplate, cloneActivityForChoiceBank, cloneBankChoiceForSchedule } from "./utils/templateHelpers.js";

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
  const [hasUnsavedCloudChanges, setHasUnsavedCloudChanges] = useState(false);
  const [syncReminder, setSyncReminder] = useState("");
  const dirtyBaselineRef = useRef("");
  const hasInitializedDirtyTrackingRef = useRef(false);
  const suppressNextDirtyCheckRef = useRef(false);
  const lastSessionUserIdRef = useRef(null);

  const selectedProfile = useMemo(() => {
    return profiles.find((profile) => profile.id === selectedProfileId) ?? profiles[0] ?? null;
  }, [profiles, selectedProfileId]);

  const activities = getScheduleForDate(selectedProfile, scheduleDate);
  const activityBank = selectedProfile?.activityBank ?? [];
  const supportEvents = selectedProfile?.supportEvents ?? [];
  const firstThenBoard = selectedProfile?.firstThenBoard ?? { firstChoiceId: "", thenChoiceId: "" };
  const displaySettings = getDisplaySettings(selectedProfile);

  const selectedActivity = useMemo(
    () => activities.find((activity) => activity.id === selectedActivityId) ?? null,
    [activities, selectedActivityId]
  );

  const dailyNote = useMemo(
    () => getDailyNote(selectedProfile, documentationDate),
    [selectedProfile, documentationDate]
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

  const workspaceDataFingerprint = useMemo(
    () => JSON.stringify(workspaceData),
    [workspaceData]
  );

  useEffect(() => {
    if (studentViewMode === "builder") {
      setStudentViewMode("schedule");
    }
  }, [studentViewMode, setStudentViewMode]);


  function buildCurrentWorkspacePayload() {
    return buildBackupPayload(workspaceData);
  }

  function formatCloudError(action, error) {
    const message = error?.message || "Unknown Supabase error.";
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("permission denied")) {
      return `${action} failed: table permission is missing. Run the v10 Supabase SQL schema or add grants for the authenticated role.`;
    }

    if (lowerMessage.includes("row-level security") || lowerMessage.includes("violates row-level security")) {
      return `${action} failed: RLS blocked the request. Confirm the user_id column and auth.uid() policies are installed.`;
    }

    if (lowerMessage.includes("jwt") || lowerMessage.includes("invalid token")) {
      return `${action} failed: the sign-in session looks expired. Sign out, sign back in, and try again.`;
    }

    if (lowerMessage.includes("failed to fetch") || lowerMessage.includes("network")) {
      return `${action} failed: network or Supabase connection problem. Check the Render env vars and Supabase project status.`;
    }

    return `${action} failed: ${message}`;
  }

  useEffect(() => {
    const safeTheme = theme === "dark" ? "dark" : "light";

    document.documentElement.dataset.theme = safeTheme;
    document.documentElement.style.colorScheme = safeTheme;
  }, [theme]);

  useEffect(() => {
    if (!textToSpeechEnabled || typeof window === "undefined" || !window.speechSynthesis) {
      return undefined;
    }

    function getReadableText(target) {
      const readable = target.closest?.(
        "button, h1, h2, h3, p, label, summary, strong, span, small, li, legend"
      );

      if (!readable) {
        return "";
      }

      const ariaLabel = readable.getAttribute?.("aria-label");
      const text = ariaLabel || readable.innerText || readable.textContent || "";

      return text.replace(/\s+/g, " ").trim().slice(0, 220);
    }

    function handleReadClick(event) {
      const text = getReadableText(event.target);

      if (!text) {
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }

    document.addEventListener("click", handleReadClick, true);

    return () => {
      document.removeEventListener("click", handleReadClick, true);
      window.speechSynthesis.cancel();
    };
  }, [textToSpeechEnabled]);


  useEffect(() => {
    if (!hasInitializedDirtyTrackingRef.current) {
      hasInitializedDirtyTrackingRef.current = true;
      dirtyBaselineRef.current = workspaceDataFingerprint;
      return;
    }

    if (suppressNextDirtyCheckRef.current) {
      suppressNextDirtyCheckRef.current = false;
      dirtyBaselineRef.current = workspaceDataFingerprint;
      return;
    }

    if (workspaceDataFingerprint !== dirtyBaselineRef.current) {
      setHasUnsavedCloudChanges(true);
      setSyncReminder("This browser workspace has changes that have not been saved to Supabase yet.");
    }
  }, [workspaceDataFingerprint]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return undefined;
    }

    let active = true;

    getCurrentSession()
      .then((currentSession) => {
        if (active) {
          setSession(currentSession);

          if (currentSession?.user?.id) {
            lastSessionUserIdRef.current = currentSession.user.id;
          }
        }
      })
      .catch((error) => {
        if (active) {
          setAuthStatus(`Could not read auth session: ${error.message}`);
        }
      });

    const unsubscribe = subscribeToAuthChanges((nextSession) => {
      const previousUserId = lastSessionUserIdRef.current;
      const nextUserId = nextSession?.user?.id ?? null;

      setSession(nextSession);

      if (nextUserId && nextUserId !== previousUserId) {
        setMode("staff");
        setAnnouncement("Staff signed in. Staff Mode opened.");
      }

      lastSessionUserIdRef.current = nextUserId;
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

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

  function updateSelectedProfileActivityBank(updater) {
    updateSelectedProfile((profile) => ({
      ...profile,
      activityBank: updater(profile.activityBank ?? []),
    }));
  }

  function isDuplicateBankChoice(bankChoices, candidate) {
    const candidateKey = String(candidate.sourceText || candidate.label || "").toLowerCase();

    return bankChoices.some((choice) => {
      const choiceKey = String(choice.sourceText || choice.label || "").toLowerCase();
      return choiceKey && candidateKey && choiceKey === candidateKey;
    });
  }


  function ensureSelectedActivityExists(nextActivities) {
    if (!nextActivities.some((activity) => activity.id === selectedActivityId)) {
      setSelectedActivityId(nextActivities[0]?.id ?? null);
    }
  }

  function clearPortableStatuses() {
    setCopyStatus("");
    setExportStatus("");
    setImportStatus("");
    setSyncStatus("");
  }

  async function handleSignUp(email, password) {
    setIsAuthWorking(true);
    setAuthStatus("");

    try {
      const data = await signUpWithEmail(email, password);

      if (data?.session) {
        setSession(data.session);
        lastSessionUserIdRef.current = data.session.user?.id ?? null;
        setMode("staff");
        setAuthStatus("Account created. Staff Mode opened.");
        setAnnouncement("Staff account created. Staff Mode opened.");
      } else {
        setAuthStatus("Account created. Check your email if confirmation is required, then sign in.");
      }
    } catch (error) {
      setAuthStatus(`Sign-up failed: ${error.message}`);
    } finally {
      setIsAuthWorking(false);
    }
  }


async function handleGoogleSignIn() {
  setIsAuthWorking(true);
  setAuthStatus("");

  try {
    await signInWithGoogle();
    setAuthStatus("Redirecting to Google sign-in...");
    setAnnouncement("Redirecting to Google sign-in.");
  } catch (error) {
    setAuthStatus(`Google sign-in failed: ${error.message}`);
  } finally {
    setIsAuthWorking(false);
  }
}

  async function handleSignIn(email, password) {
    setIsAuthWorking(true);
    setAuthStatus("");

    try {
      const data = await signInWithEmail(email, password);
      setSession(data.session ?? null);
      lastSessionUserIdRef.current = data.session?.user?.id ?? null;
      setMode("staff");
      setAuthStatus("Signed in. Staff Mode opened.");
      setAnnouncement("Staff signed in. Staff Mode opened.");
    } catch (error) {
      setAuthStatus(`Sign-in failed: ${error.message}`);
    } finally {
      setIsAuthWorking(false);
    }
  }

  async function handleSignOut() {
    setIsAuthWorking(true);
    setAuthStatus("");

    try {
      await signOut();
      setSession(null);
      lastSessionUserIdRef.current = null;
      setAuthStatus("Signed out.");
      setSyncStatus("");
    } catch (error) {
      setAuthStatus(`Sign-out failed: ${error.message}`);
    } finally {
      setIsAuthWorking(false);
    }
  }

  async function handleAddActivity(taskText) {
    if (!selectedProfile) {
      return;
    }

    const activity = await generateActivityFromTask(taskText);

    updateSelectedProfileActivities((currentActivities) => [...currentActivities, activity]);
    setSelectedActivityId(activity.id);
    clearPortableStatuses();
    setAnnouncement(`${activity.label} added to today’s schedule.`);
  }


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

  function handleUpdateStepPrompt(activityId, stepId, promptLevel) {
    handleUpdateStep(activityId, stepId, { promptLevel });
    setAnnouncement("Support level recorded.");
  }

  function handleDismissReview(activityId) {
    handleUpdateActivity(activityId, { pendingReview: false });
    setAnnouncement("Review dismissed.");
  }

  function handleUpdateFirstThenBoard(nextBoard) {
    updateSelectedProfile((profile) => ({
      ...profile,
      firstThenBoard: {
        firstChoiceId: nextBoard.firstChoiceId ?? "",
        thenChoiceId: nextBoard.thenChoiceId ?? "",
      },
    }));

    clearPortableStatuses();
  }

  function handleAddFirstThenToSchedule() {
    const choiceIds = [firstThenBoard.firstChoiceId, firstThenBoard.thenChoiceId].filter(Boolean);
    const selectedChoices = choiceIds
      .map((choiceId) => activityBank.find((choice) => choice.id === choiceId))
      .filter(Boolean);

    if (selectedChoices.length === 0) {
      setAnnouncement("Choose a first or then activity before adding to the schedule.");
      return;
    }

    const activitiesToAdd = selectedChoices.map(cloneBankChoiceForSchedule);

    updateSelectedProfileActivities((currentActivities) => [...currentActivities, ...activitiesToAdd]);
    setSelectedActivityId(activitiesToAdd[0]?.id ?? selectedActivityId);
    clearPortableStatuses();
    setAnnouncement("First / Then activities added to the schedule.");
  }


  async function handleStudentAddActivity(request) {
    if (!selectedProfile) {
      return;
    }

    const settings = getIndependenceSettings(selectedProfile);

    if (!settings.studentCanBuildSchedule) {
      setAnnouncement("Staff support is required to add activities for this profile.");
      return;
    }

    let activity = null;

    if (typeof request === "string") {
      activity = await generateActivityFromTask(request);
    } else if (request?.type === "bank") {
      const choice = activityBank.find((item) => item.id === request.choiceId);

      if (!choice) {
        setAnnouncement("That bank choice is no longer available.");
        return;
      }

      activity = cloneBankChoiceForSchedule(choice);
    } else if (request?.type === "custom") {
      activity = await generateActivityFromTask(request.taskText, {
        customSteps: request.stepLabels,
      });
      activity.pendingReview = true;
    }

    if (!activity) {
      setAnnouncement("Choose an activity before adding it to the schedule.");
      return;
    }

    updateSelectedProfileActivities((currentActivities) => [...currentActivities, activity]);
    setSelectedActivityId(activity.id);
    clearPortableStatuses();
    setAnnouncement(`${activity.label} added to the schedule.`);
  }


  async function handleApplyDailyTemplate(template) {
    if (!selectedProfile || !template?.tasks?.length) {
      setAnnouncement("Choose a daily template before applying it.");
      return;
    }

    const generatedActivities = [];

    for (const task of template.tasks) {
      generatedActivities.push(await generateActivityFromTask(task));
    }

    updateSelectedProfileActivities(() => generatedActivities);
    setSelectedActivityId(generatedActivities[0]?.id ?? null);
    clearPortableStatuses();
    setAnnouncement(`${template.label} applied to ${scheduleDate}.`);
  }

  function handleStudentClearSchedule() {
    if (!selectedProfile) {
      return;
    }

    const settings = getIndependenceSettings(selectedProfile);

    if (!settings.studentCanClearSchedule) {
      setAnnouncement("Staff has not enabled schedule clearing for this profile.");
      return;
    }

    const shouldClear = window.confirm("Start this schedule over? This clears the current activities for this profile in this browser.");

    if (!shouldClear) {
      setAnnouncement("Schedule was not cleared.");
      return;
    }

    updateSelectedProfileActivities(() => []);
    setSelectedActivityId(null);
    clearPortableStatuses();
    setAnnouncement("Schedule cleared. Choose activities to add to the schedule.");
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setAnnouncement(`${nextMode === "student" ? "Student" : "Staff"} Mode selected.`);
  }

  function handleThemeChange(nextTheme) {
    const safeTheme = nextTheme === "dark" ? "dark" : "light";
    setTheme(safeTheme);
    setAnnouncement(`${safeTheme === "dark" ? "Dark" : "Light"} mode selected.`);
  }

  function handleStudentViewModeChange(nextViewMode) {
    setStudentViewMode(nextViewMode);

    const viewLabel = nextViewMode === "firstThen" ? "First / Then" : "My Schedule";

    setAnnouncement(`${viewLabel} view selected.`);
  }


  function handleScheduleDateChange(nextDate) {
    const safeDate = nextDate || getTodayDateKey();
    setScheduleDate(safeDate);
    setDocumentationDate(safeDate);
    setSelectedActivityId(getScheduleForDate(selectedProfile, safeDate)[0]?.id ?? null);
    clearPortableStatuses();
    setAnnouncement(`Schedule date changed to ${safeDate}.`);
  }

  function handleDocumentationDateChange(nextDate) {
    setDocumentationDate(nextDate || getTodayDateKey());
    clearPortableStatuses();
  }

  function handleUpdateDailyNote(nextDailyNote) {
    if (!selectedProfile) {
      return;
    }

    updateSelectedProfile((profile) => ({
      ...profile,
      documentationByDate: {
        ...(profile.documentationByDate ?? {}),
        [documentationDate]: {
          ...createBlankDailyNote(documentationDate),
          ...nextDailyNote,
          date: documentationDate,
          updatedAt: new Date().toISOString(),
        },
      },
    }));

    clearPortableStatuses();
  }

  async function handleCopyDailyNote() {
    const text = buildDailyProgressNote(selectedProfile, activities, dailyNote, supportEvents);

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API unavailable.");
      }

      await navigator.clipboard.writeText(text);
      setCopyStatus("Progress note copied.");
    } catch {
      setCopyStatus("Copy unavailable. Select the generated note text and copy it manually.");
    }
  }

  function handleDownloadDailyNote() {
    const filename = `${documentationDate}-${buildSafeFilename(selectedProfile?.name)}-accessflow-note.txt`;
    const content = buildDailyProgressNote(selectedProfile, activities, dailyNote, supportEvents);

    downloadTextFile(filename, content, "text/plain");
    setCopyStatus("Daily note downloaded.");
  }

  function handleDownloadActivityCsv() {
    const filename = `${documentationDate}-${buildSafeFilename(selectedProfile?.name)}-activity-summary.csv`;
    const content = buildActivityCsv(selectedProfile, activities, dailyNote);

    downloadTextFile(filename, content, "text/csv");
    setCopyStatus("Activity CSV downloaded.");
  }

  function handleExportBackup() {
    const payload = buildCurrentWorkspacePayload();

    const filename = `${getTodayDateKey()}-accessflow-backup.json`;
    downloadTextFile(filename, JSON.stringify(payload, null, 2), "application/json");
    setExportStatus("Backup exported.");
    setImportStatus("");
  }

  function handleImportBackup(file) {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result));
        const validationError = validateBackupPayload(payload);

        if (validationError) {
          setImportStatus(validationError);
          return;
        }

        const imported = normalizeImportedBackupData(payload.data);

        setProfiles(imported.profiles);
        setTemplates(imported.templates);
        setSelectedProfileId(imported.selectedProfileId);
        setDocumentationDate(imported.documentationDate || getTodayDateKey());
        setScheduleDate(imported.scheduleDate || imported.documentationDate || getTodayDateKey());
        setMode(imported.mode);
        setStudentViewMode(imported.studentViewMode);

        const nextProfile =
          imported.profiles.find((profile) => profile.id === imported.selectedProfileId) ??
          imported.profiles[0];

        setSelectedActivityId(nextProfile?.activities?.[0]?.id ?? null);
        setImportStatus("Backup imported.");
        setExportStatus("");
        setCopyStatus("");
        setAnnouncement("AccessFlow backup imported.");
        setHasUnsavedCloudChanges(true);
        setSyncReminder("Imported backup is only in this browser until you save a new cloud snapshot.");
      } catch {
        setImportStatus("Could not import backup. Make sure the file is valid JSON.");
      }
    };

    reader.onerror = () => {
      setImportStatus("Could not read the selected backup file.");
    };

    reader.readAsText(file);
  }

  function restoreWorkspaceFromPayload(payload, sourceLabel = "backup", options = {}) {
    const validationError = validateBackupPayload(payload);

    if (validationError) {
      throw new Error(validationError);
    }

    const imported = normalizeImportedBackupData(payload.data);

    if (options.markCloudClean) {
      suppressNextDirtyCheckRef.current = true;
      dirtyBaselineRef.current = JSON.stringify(payload.data);
      setHasUnsavedCloudChanges(false);
      setSyncReminder("");
    } else {
      setHasUnsavedCloudChanges(true);
      setSyncReminder("Restored workspace is local until you save a new cloud snapshot.");
    }

    setProfiles(imported.profiles);
    setTemplates(imported.templates);
    setSelectedProfileId(imported.selectedProfileId);
    setDocumentationDate(imported.documentationDate || getTodayDateKey());
    setMode(imported.mode);
    setStudentViewMode(imported.studentViewMode);

    const nextProfile =
      imported.profiles.find((profile) => profile.id === imported.selectedProfileId) ??
      imported.profiles[0];

    setSelectedActivityId(nextProfile?.activities?.[0]?.id ?? null);
    setCopyStatus("");
    setExportStatus("");
    setImportStatus("");
    setSyncStatus(`Workspace restored from ${sourceLabel}.`);
  }

  async function handleSaveCloudSnapshot() {
    setIsSyncing(true);
    setSyncStatus("");

    try {
      const payload = buildCurrentWorkspacePayload();
      const saved = await saveWorkspaceSnapshot(payload);
      const savedAt = saved?.updated_at ?? new Date().toISOString();

      dirtyBaselineRef.current = workspaceDataFingerprint;
      setHasUnsavedCloudChanges(false);
      setSyncReminder("");
      setSyncMetadata((current) => ({
        ...current,
        lastSavedAt: savedAt,
        lastSnapshotId: saved?.id ?? current.lastSnapshotId ?? null,
      }));
      setSyncStatus(`Cloud snapshot saved at ${new Date(savedAt).toLocaleString()}.`);
    } catch (error) {
      setSyncStatus(formatCloudError("Cloud save", error));
    } finally {
      setIsSyncing(false);
    }
  }

  async function handleLoadCloudSnapshot() {
    const shouldLoad = window.confirm(
      "Load the latest cloud snapshot? This will replace the current browser workspace with the latest Supabase snapshot for this signed-in account."
    );

    if (!shouldLoad) {
      setSyncStatus("Cloud load cancelled. Current browser workspace was not changed.");
      return;
    }

    setIsSyncing(true);
    setSyncStatus("");

    try {
      const snapshot = await loadLatestWorkspaceSnapshot();

      if (!snapshot?.payload) {
        setSyncStatus("No cloud snapshot found for this signed-in account.");
        return;
      }

      restoreWorkspaceFromPayload(snapshot.payload, "Supabase", { markCloudClean: true });
      const loadedAt = snapshot.updated_at ?? snapshot.created_at ?? new Date().toISOString();
      setSyncMetadata((current) => ({
        ...current,
        lastLoadedAt: loadedAt,
        lastSnapshotId: snapshot.id ?? current.lastSnapshotId ?? null,
      }));
    } catch (error) {
      setSyncStatus(formatCloudError("Cloud load", error));
    } finally {
      setIsSyncing(false);
    }
  }

  function handleSelectProfile(profileId) {
    const nextProfile = profiles.find((profile) => profile.id === profileId);
    setSelectedProfileId(profileId);
    setSelectedActivityId(nextProfile?.activities?.[0]?.id ?? null);
    clearPortableStatuses();
    setAnnouncement(`${nextProfile?.name ?? "Profile"} selected.`);
  }

  function handleAddProfile(name) {
    const profile = createBlankProfile(name);

    setProfiles((currentProfiles) => [...currentProfiles, profile]);
    setSelectedProfileId(profile.id);
    setSelectedActivityId(null);
    clearPortableStatuses();
    setAnnouncement(`${profile.name} profile added.`);
  }

  function handleUpdateProfile(profileId, patch) {
    setProfiles((currentProfiles) =>
      currentProfiles.map((profile) =>
        profile.id === profileId ? { ...profile, ...patch } : profile
      )
    );
  }

  function handleDeleteProfile(profileId) {
    setProfiles((currentProfiles) => {
      if (currentProfiles.length <= 1) {
        return currentProfiles;
      }

      const nextProfiles = currentProfiles.filter((profile) => profile.id !== profileId);

      if (selectedProfileId === profileId) {
        setSelectedProfileId(nextProfiles[0]?.id ?? null);
        setSelectedActivityId(nextProfiles[0]?.activities?.[0]?.id ?? null);
      }

      return nextProfiles;
    });

    clearPortableStatuses();
    setAnnouncement("Profile deleted.");
  }

  function handleSelectActivity(activityId) {
    setSelectedActivityId(activityId);
  }

  function handleToggleActivityComplete(activityId) {
    updateSelectedProfileActivities((currentActivities) =>
      currentActivities.map((activity) => {
        if (activity.id !== activityId) {
          return activity;
        }

        const nextCompleted = !activity.completed;

        return {
          ...activity,
          completed: nextCompleted,
          steps: activity.steps.map((step) => ({
            ...step,
            completed: nextCompleted,
          })),
        };
      })
    );

    if (selectedActivityId === activityId) {
      const currentActivity = activities.find((activity) => activity.id === activityId);

      if (!currentActivity?.completed) {
        setSelectedActivityId(null);
      }
    }

    clearPortableStatuses();
  }

  function handleToggleStep(activityId, stepId) {
    const currentActivity = activities.find((activity) => activity.id === activityId);
    const updatedStepsForSelectedActivity = currentActivity?.steps.map((step) =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    const willCompleteSelectedActivity =
      currentActivity &&
      selectedActivityId === activityId &&
      updatedStepsForSelectedActivity.length > 0 &&
      updatedStepsForSelectedActivity.every((step) => step.completed);

    updateSelectedProfileActivities((currentActivities) =>
      updateActivityById(currentActivities, activityId, (activity) => {
        const updatedSteps = activity.steps.map((step) =>
          step.id === stepId ? { ...step, completed: !step.completed } : step
        );

        const updatedActivity = {
          ...activity,
          steps: updatedSteps,
        };

        return {
          ...updatedActivity,
          completed: areAllStepsComplete(updatedActivity),
        };
      })
    );

    if (willCompleteSelectedActivity) {
      setSelectedActivityId(null);
    }

    clearPortableStatuses();
  }

  function handleMoveActivity(activityId, direction) {
    updateSelectedProfileActivities((currentActivities) =>
      moveItemById(currentActivities, activityId, direction)
    );
  }

  function handleStudentMoveActivity(activityId, direction) {
    const settings = getIndependenceSettings(selectedProfile);

    if (!settings.studentCanReorderSchedule) {
      setAnnouncement("Staff has not enabled schedule reordering for this profile.");
      return;
    }

    handleMoveActivity(activityId, direction);
    clearPortableStatuses();
    setAnnouncement("Schedule order changed.");
  }

  function handleStudentRemoveActivity(activityId) {
    const settings = getIndependenceSettings(selectedProfile);

    if (!settings.studentCanRemoveActivities) {
      setAnnouncement("Staff has not enabled activity removal for this profile.");
      return;
    }

    handleDeleteActivity(activityId);
    setAnnouncement("Activity removed from the schedule.");
  }

  function handleUpdateActivity(activityId, patch) {
    updateSelectedProfileActivities((currentActivities) =>
      updateActivityById(currentActivities, activityId, (activity) => ({
        ...activity,
        ...patch,
        visual: patch.visual ?? activity.visual,
      }))
    );
  }

  function handleUpdateStep(activityId, stepId, patch) {
    updateSelectedProfileActivities((currentActivities) =>
      updateActivityById(currentActivities, activityId, (activity) => ({
        ...activity,
        steps: activity.steps.map((step) =>
          step.id === stepId
            ? {
                ...step,
                ...patch,
                visual: patch.visual ?? step.visual,
              }
            : step
        ),
      }))
    );
  }

  function handleAddStep(activityId, step) {
    updateSelectedProfileActivities((currentActivities) =>
      updateActivityById(currentActivities, activityId, (activity) => ({
        ...activity,
        completed: false,
        steps: [...activity.steps, step],
      }))
    );
  }

  function handleDeleteStep(activityId, stepId) {
    updateSelectedProfileActivities((currentActivities) =>
      updateActivityById(currentActivities, activityId, (activity) => {
        const updatedSteps = activity.steps.filter((step) => step.id !== stepId);
        const updatedActivity = {
          ...activity,
          steps: updatedSteps,
        };

        return {
          ...updatedActivity,
          completed: areAllStepsComplete(updatedActivity),
        };
      })
    );
    clearPortableStatuses();
  }

  function handleMoveStep(activityId, stepId, direction) {
    updateSelectedProfileActivities((currentActivities) =>
      updateActivityById(currentActivities, activityId, (activity) => ({
        ...activity,
        steps: moveItemById(activity.steps, stepId, direction),
      }))
    );
  }

  function handleDeleteActivity(activityId) {
    updateSelectedProfileActivities((currentActivities) => {
      const updatedActivities = currentActivities.filter((activity) => activity.id !== activityId);
      ensureSelectedActivityExists(updatedActivities);
      return updatedActivities;
    });

    clearPortableStatuses();
    setAnnouncement("Activity deleted.");
  }

  async function handleAddChoiceToBank(taskText) {
    if (!selectedProfile) {
      return;
    }

    const activity = await generateActivityFromTask(taskText);

    if (isDuplicateBankChoice(activityBank, activity)) {
      setAnnouncement(`${activity.label} is already in this student's choices.`);
      return;
    }

    updateSelectedProfileActivityBank((currentBank) => [
      ...currentBank,
      cloneActivityForChoiceBank(activity),
    ]);

    clearPortableStatuses();
    setAnnouncement(`${activity.label} added to ${selectedProfile.name}'s choices.`);
  }

  function handleUpdateBankChoice(choiceId, patch) {
    updateSelectedProfileActivityBank((currentBank) =>
      currentBank.map((choice) =>
        choice.id === choiceId
          ? {
              ...choice,
              ...patch,
              visual: patch.visual ?? choice.visual,
            }
          : choice
      )
    );

    clearPortableStatuses();
  }

  function handleSaveActivityToBank(activityId) {
    const activity = activities.find((item) => item.id === activityId);

    if (!activity) {
      setAnnouncement("Choose an activity before saving it to Student Choices.");
      return;
    }

    if (isDuplicateBankChoice(activityBank, activity)) {
      setAnnouncement(`${activity.label} is already in Student Choices.`);
      return;
    }

    updateSelectedProfileActivityBank((currentBank) => [
      ...currentBank,
      cloneActivityForChoiceBank(activity),
    ]);

    handleUpdateActivity(activityId, { pendingReview: false });
    clearPortableStatuses();
    setAnnouncement(`${activity.label} saved to Student Choices.`);
  }

  function handleAddBankChoiceToSchedule(choiceId) {
    const choice = activityBank.find((item) => item.id === choiceId);

    if (!choice) {
      setAnnouncement("That bank choice is no longer available.");
      return;
    }

    const activity = cloneBankChoiceForSchedule(choice);

    updateSelectedProfileActivities((currentActivities) => [...currentActivities, activity]);
    setSelectedActivityId(activity.id);
    clearPortableStatuses();
    setAnnouncement(`${activity.label} added to ${selectedProfile?.name ?? "the selected profile"}'s schedule.`);
  }

  function handleDeleteBankChoice(choiceId) {
    updateSelectedProfileActivityBank((currentBank) =>
      currentBank.filter((choice) => choice.id !== choiceId)
    );

    clearPortableStatuses();
    setAnnouncement("Choice removed from the bank.");
  }

  function handleSaveCurrentScheduleAsTemplate(name, description) {
    if (!selectedProfile) {
      return;
    }

    const template = {
      id: createId("template"),
      name,
      description,
      activities: cloneActivitiesForTemplate(selectedProfile.activities ?? []),
    };

    setTemplates((currentTemplates) => [...currentTemplates, template]);
    clearPortableStatuses();
    setAnnouncement(`${name} template saved.`);
  }

  function handleApplyTemplateToProfile(templateId) {
    const template = templates.find((item) => item.id === templateId);

    if (!template || !selectedProfile) {
      return;
    }

    const clonedActivities = cloneActivitiesForProfile(template.activities);

    updateSelectedProfile((profile) => ({
      ...profile,
      activities: clonedActivities,
    }));

    setSelectedActivityId(clonedActivities[0]?.id ?? null);
    clearPortableStatuses();
    setAnnouncement(`${template.name} applied to ${selectedProfile.name}.`);
  }

  function handleDeleteTemplate(templateId) {
    setTemplates((currentTemplates) =>
      currentTemplates.filter((template) => template.id !== templateId)
    );
    clearPortableStatuses();
    setAnnouncement("Template deleted.");
  }

  function handleResetDemo() {
    setProfiles(starterProfiles);
    setTemplates(starterTemplates);
    setSelectedProfileId(starterProfiles[0]?.id ?? null);
    setSelectedActivityId(starterProfiles[0]?.activities[0]?.id ?? null);
    setDocumentationDate(getTodayDateKey());
    clearPortableStatuses();
    setAnnouncement("Demo data reset.");
  }

  function handleClearSchedule() {
    updateSelectedProfileActivities(() => []);
    setSelectedActivityId(null);
    clearPortableStatuses();
    setAnnouncement("Selected profile schedule cleared.");
  }

  return (
    <main className="app-shell">
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
        />
      </header>

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

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
          independenceSettings={getIndependenceSettings(selectedProfile)}
          displaySettings={displaySettings}
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
      ) : (
        <StaffView
          profiles={profiles}
          selectedProfile={selectedProfile}
          selectedProfileId={selectedProfile?.id ?? selectedProfileId}
          templates={templates}
          activities={activities}
          activityBank={activityBank}
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
      )}
    </main>
  );
}
