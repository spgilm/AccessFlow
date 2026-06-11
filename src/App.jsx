import { useMemo, useState } from "react";
import ModeToggle from "./components/ModeToggle.jsx";
import StaffView from "./components/StaffView.jsx";
import StudentView from "./components/StudentView.jsx";
import { starterProfiles, createBlankProfile } from "./data/starterProfiles.js";
import { starterTemplates } from "./data/starterTemplates.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { generateActivityFromTask } from "./services/taskGenerator.js";
import { areAllStepsComplete, moveItemById, updateActivityById } from "./utils/activityHelpers.js";
import { createId } from "./utils/formatters.js";
import { cloneActivitiesForProfile, cloneActivitiesForTemplate } from "./utils/templateHelpers.js";

const PROFILES_STORAGE_KEY = "accessflow.profiles.v4";
const SELECTED_PROFILE_STORAGE_KEY = "accessflow.selectedProfile.v4";
const TEMPLATES_STORAGE_KEY = "accessflow.templates.v4";
const MODE_STORAGE_KEY = "accessflow.mode.v4";
const STUDENT_VIEW_STORAGE_KEY = "accessflow.studentView.v4";

export default function App() {
  const [profiles, setProfiles] = useLocalStorage(PROFILES_STORAGE_KEY, starterProfiles);
  const [selectedProfileId, setSelectedProfileId] = useLocalStorage(
    SELECTED_PROFILE_STORAGE_KEY,
    starterProfiles[0]?.id ?? null
  );
  const [templates, setTemplates] = useLocalStorage(TEMPLATES_STORAGE_KEY, starterTemplates);
  const [mode, setMode] = useLocalStorage(MODE_STORAGE_KEY, "student");
  const [studentViewMode, setStudentViewMode] = useLocalStorage(
    STUDENT_VIEW_STORAGE_KEY,
    "schedule"
  );
  const [selectedActivityId, setSelectedActivityId] = useState(
    starterProfiles[0]?.activities[0]?.id ?? null
  );
  const [announcement, setAnnouncement] = useState("");

  const selectedProfile = useMemo(() => {
    return profiles.find((profile) => profile.id === selectedProfileId) ?? profiles[0] ?? null;
  }, [profiles, selectedProfileId]);

  const activities = selectedProfile?.activities ?? [];

  const selectedActivity = useMemo(
    () => activities.find((activity) => activity.id === selectedActivityId) ?? null,
    [activities, selectedActivityId]
  );

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
    updateSelectedProfile((profile) => ({
      ...profile,
      activities: updater(profile.activities ?? []),
    }));
  }

  function ensureSelectedActivityExists(nextActivities) {
    if (!nextActivities.some((activity) => activity.id === selectedActivityId)) {
      setSelectedActivityId(nextActivities[0]?.id ?? null);
    }
  }

  async function handleAddActivity(taskText) {
    if (!selectedProfile) {
      return;
    }

    const activity = await generateActivityFromTask(taskText);

    updateSelectedProfileActivities((currentActivities) => [...currentActivities, activity]);
    setSelectedActivityId(activity.id);
    setAnnouncement(`${activity.label} added to ${selectedProfile.name}'s schedule.`);
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setAnnouncement(`${nextMode === "student" ? "Student" : "Staff"} Mode selected.`);
  }

  function handleStudentViewModeChange(nextViewMode) {
    setStudentViewMode(nextViewMode);
    setAnnouncement(`${nextViewMode === "firstThen" ? "First / Then" : "Full Schedule"} view selected.`);
  }

  function handleSelectProfile(profileId) {
    const nextProfile = profiles.find((profile) => profile.id === profileId);
    setSelectedProfileId(profileId);
    setSelectedActivityId(nextProfile?.activities?.[0]?.id ?? null);
    setAnnouncement(`${nextProfile?.name ?? "Profile"} selected.`);
  }

  function handleAddProfile(name) {
    const profile = createBlankProfile(name);

    setProfiles((currentProfiles) => [...currentProfiles, profile]);
    setSelectedProfileId(profile.id);
    setSelectedActivityId(null);
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

    setAnnouncement("Profile deleted.");
  }

  function handleSelectActivity(activityId) {
    setSelectedActivityId(activityId);
  }

  function handleToggleActivityComplete(activityId) {
    updateSelectedProfileActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              completed: !activity.completed,
              steps: activity.steps.map((step) => ({
                ...step,
                completed: !activity.completed ? true : step.completed,
              })),
            }
          : activity
      )
    );
  }

  function handleToggleStep(activityId, stepId) {
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
  }

  function handleMoveActivity(activityId, direction) {
    updateSelectedProfileActivities((currentActivities) =>
      moveItemById(currentActivities, activityId, direction)
    );
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

    setAnnouncement("Activity deleted.");
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
    setAnnouncement(`${template.name} applied to ${selectedProfile.name}.`);
  }

  function handleDeleteTemplate(templateId) {
    setTemplates((currentTemplates) =>
      currentTemplates.filter((template) => template.id !== templateId)
    );
    setAnnouncement("Template deleted.");
  }

  function handleResetDemo() {
    setProfiles(starterProfiles);
    setTemplates(starterTemplates);
    setSelectedProfileId(starterProfiles[0]?.id ?? null);
    setSelectedActivityId(starterProfiles[0]?.activities[0]?.id ?? null);
    setAnnouncement("Demo data reset.");
  }

  function handleClearSchedule() {
    updateSelectedProfileActivities(() => []);
    setSelectedActivityId(null);
    setAnnouncement("Selected profile schedule cleared.");
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">Adaptive visual schedule</p>
          <h1>AccessFlow</h1>
          <p className="app-description">
            Create, edit, save, reuse, and use visual schedules with step-by-step supports.
          </p>
        </div>

        <ModeToggle mode={mode} onModeChange={handleModeChange} />
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
          studentViewMode={studentViewMode}
          onStudentViewModeChange={handleStudentViewModeChange}
          onSelectActivity={handleSelectActivity}
          onToggleActivityComplete={handleToggleActivityComplete}
          onToggleStep={handleToggleStep}
          onCloseDetail={() => setSelectedActivityId(null)}
        />
      ) : (
        <StaffView
          profiles={profiles}
          selectedProfile={selectedProfile}
          selectedProfileId={selectedProfile?.id ?? selectedProfileId}
          templates={templates}
          activities={activities}
          selectedActivity={selectedActivity}
          selectedActivityId={selectedActivityId}
          onSelectProfile={handleSelectProfile}
          onAddProfile={handleAddProfile}
          onUpdateProfile={handleUpdateProfile}
          onDeleteProfile={handleDeleteProfile}
          onSaveCurrentScheduleAsTemplate={handleSaveCurrentScheduleAsTemplate}
          onApplyTemplateToProfile={handleApplyTemplateToProfile}
          onDeleteTemplate={handleDeleteTemplate}
          onAddActivity={handleAddActivity}
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
