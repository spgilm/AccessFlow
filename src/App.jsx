import { useMemo, useState } from "react";
import AddActivityForm from "./components/AddActivityForm.jsx";
import ActivityDetail from "./components/ActivityDetail.jsx";
import ProgressSummary from "./components/ProgressSummary.jsx";
import ScheduleList from "./components/ScheduleList.jsx";
import { starterActivities } from "./data/starterActivities.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { generateActivityFromTask } from "./services/taskGenerator.js";

const STORAGE_KEY = "accessflow.activities.v1";

export default function App() {
  const [activities, setActivities] = useLocalStorage(STORAGE_KEY, starterActivities);
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
      currentActivities.map((activity) => {
        if (activity.id !== activityId) {
          return activity;
        }

        const updatedSteps = activity.steps.map((step) =>
          step.id === stepId ? { ...step, completed: !step.completed } : step
        );

        const allStepsComplete = updatedSteps.every((step) => step.completed);

        return {
          ...activity,
          steps: updatedSteps,
          completed: allStepsComplete,
        };
      })
    );
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
            Create simple daily activity cards with visual supports and step-by-step task breakdowns.
          </p>
        </div>
      </header>

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      <ProgressSummary activities={activities} />

      <AddActivityForm onAddActivity={handleAddActivity} />

      <div className="workspace-grid">
        <ScheduleList
          activities={activities}
          selectedActivityId={selectedActivityId}
          onSelectActivity={handleSelectActivity}
          onToggleActivityComplete={handleToggleActivityComplete}
        />

        <ActivityDetail
          activity={selectedActivity}
          onClose={() => setSelectedActivityId(null)}
          onToggleStep={handleToggleStep}
          onToggleActivityComplete={handleToggleActivityComplete}
        />
      </div>

      <section className="panel controls-panel" aria-label="Demo controls">
        <button type="button" className="secondary-button" onClick={handleResetDemo}>
          Reset demo
        </button>
        <button type="button" className="danger-button" onClick={handleClearSchedule}>
          Clear schedule
        </button>
      </section>
    </main>
  );
}
