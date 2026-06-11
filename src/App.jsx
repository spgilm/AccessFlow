import { useMemo, useState } from "react";
import ModeToggle from "./components/ModeToggle.jsx";
import StaffView from "./components/StaffView.jsx";
import StudentView from "./components/StudentView.jsx";
import { starterActivities } from "./data/starterActivities.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { generateActivityFromTask } from "./services/taskGenerator.js";
import { areAllStepsComplete, moveItemById, updateActivityById } from "./utils/activityHelpers.js";

const ACTIVITIES_STORAGE_KEY = "accessflow.activities.v3";
const MODE_STORAGE_KEY = "accessflow.mode.v3";
const STUDENT_VIEW_STORAGE_KEY = "accessflow.studentView.v3";

export default function App() {
  const [activities, setActivities] = useLocalStorage(
    ACTIVITIES_STORAGE_KEY,
    starterActivities
  );
  const [mode, setMode] = useLocalStorage(MODE_STORAGE_KEY, "student");
  const [studentViewMode, setStudentViewMode] = useLocalStorage(
    STUDENT_VIEW_STORAGE_KEY,
    "schedule"
  );
  const [selectedActivityId, setSelectedActivityId] = useState(
    starterActivities[0]?.id ?? null
  );
  const [announcement, setAnnouncement] = useState("");

  const selectedActivity = useMemo(
    () => activities.find((activity) => activity.id === selectedActivityId) ?? null,
    [activities, selectedActivityId]
  );

  async function handleAddActivity(taskText) {
    const activity = await generateActivityFromTask(taskText);

    setActivities((currentActivities) => [...currentActivities, activity]);
    setSelectedActivityId(activity.id);
    setAnnouncement(`${activity.label} added to schedule.`);
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setAnnouncement(`${nextMode === "student" ? "Student" : "Staff"} Mode selected.`);
  }

  function handleStudentViewModeChange(nextViewMode) {
    setStudentViewMode(nextViewMode);
    setAnnouncement(`${nextViewMode === "firstThen" ? "First / Then" : "Full Schedule"} view selected.`);
  }

  function handleSelectActivity(activityId) {
    setSelectedActivityId(activityId);
  }

  function handleToggleActivityComplete(activityId) {
    setActivities((currentActivities) =>
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
    setActivities((currentActivities) =>
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
    setActivities((currentActivities) => moveItemById(currentActivities, activityId, direction));
  }

  function handleUpdateActivity(activityId, patch) {
    setActivities((currentActivities) =>
      updateActivityById(currentActivities, activityId, (activity) => ({
        ...activity,
        ...patch,
        visual: patch.visual ?? activity.visual,
      }))
    );
  }

  function handleUpdateStep(activityId, stepId, patch) {
    setActivities((currentActivities) =>
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
    setActivities((currentActivities) =>
      updateActivityById(currentActivities, activityId, (activity) => ({
        ...activity,
        completed: false,
        steps: [...activity.steps, step],
      }))
    );
  }

  function handleDeleteStep(activityId, stepId) {
    setActivities((currentActivities) =>
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
    setActivities((currentActivities) =>
      updateActivityById(currentActivities, activityId, (activity) => ({
        ...activity,
        steps: moveItemById(activity.steps, stepId, direction),
      }))
    );
  }

  function handleDeleteActivity(activityId) {
    setActivities((currentActivities) => {
      const updatedActivities = currentActivities.filter((activity) => activity.id !== activityId);

      if (selectedActivityId === activityId) {
        setSelectedActivityId(updatedActivities[0]?.id ?? null);
      }

      return updatedActivities;
    });

    setAnnouncement("Activity deleted.");
  }

  function handleResetDemo() {
    setActivities(starterActivities);
    setSelectedActivityId(starterActivities[0]?.id ?? null);
    setAnnouncement("Demo schedule reset.");
  }

  function handleClearSchedule() {
    setActivities([]);
    setSelectedActivityId(null);
    setAnnouncement("Schedule cleared.");
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">Adaptive visual schedule</p>
          <h1>AccessFlow</h1>
          <p className="app-description">
            Create, edit, and use simple visual schedules with step-by-step supports.
          </p>
        </div>

        <ModeToggle mode={mode} onModeChange={handleModeChange} />
      </header>

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      {mode === "student" ? (
        <StudentView
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
          activities={activities}
          selectedActivity={selectedActivity}
          selectedActivityId={selectedActivityId}
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
