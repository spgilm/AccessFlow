/**
 * useScheduleActivityActions
 *
 * Groups current-schedule and activity/step editing handlers outside App.jsx.
 */
import { getIndependenceSettings } from "../data/independenceSettings.js";
import { generateActivityFromTask } from "../services/taskGenerator.js";
import { cloneBankChoiceForSchedule } from "../utils/templateHelpers.js";
import {
  areAllStepsComplete,
  moveItemById,
  updateActivityById,
} from "../utils/activityHelpers.js";

export function useScheduleActivityActions({
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
}) {
  function ensureSelectedActivityExists(nextActivities) {
    if (!selectedActivityId) {
      return;
    }

    const stillExists = nextActivities.some((activity) => activity.id === selectedActivityId);

    if (!stillExists) {
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
    clearPortableStatuses();
    setAnnouncement(`${activity.label} added to today’s schedule.`);
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

  function handleSelectActivity(activityId) {
    setSelectedActivityId(activityId);
  }

  function handleToggleActivityComplete(activityId) {
    const currentActivity = activities.find((activity) => activity.id === activityId);

    if (
      currentActivity &&
      !currentActivity.completed &&
      !confirmMajorStudentAction(`Mark ${currentActivity.label} and all smaller steps as done?`)
    ) {
      setAnnouncement("Activity was not marked done.");
      return;
    }

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

    if (selectedActivityId === activityId && !currentActivity?.completed) {
      setSelectedActivityId(null);
    }

    clearPortableStatuses();

    if (currentActivity) {
      const message = currentActivity.completed ? `${currentActivity.label} not done.` : `${currentActivity.label} done.`;
      setAnnouncement(message);
      playStudentAudioFeedback(message);
    }
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

    const currentStep = currentActivity?.steps.find((step) => step.id === stepId);
    if (currentStep) {
      const message = currentStep.completed ? `${currentStep.label} not done.` : `${currentStep.label} done.`;
      setAnnouncement(message);
      playStudentAudioFeedback(message);
    }
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

    const activity = activities.find((item) => item.id === activityId);

    if (
      activity &&
      !confirmMajorStudentAction(`Remove ${activity.label} from the schedule?`)
    ) {
      setAnnouncement("Activity was not removed.");
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

  function handleUpdateStepPrompt(activityId, stepId, promptLevel) {
    handleUpdateStep(activityId, stepId, { promptLevel });
    setAnnouncement("Support level recorded.");
  }

  function handleDismissReview(activityId) {
    handleUpdateActivity(activityId, { pendingReview: false });
    setAnnouncement("Review dismissed.");
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

  function handleClearSchedule() {
    updateSelectedProfileActivities(() => []);
    setSelectedActivityId(null);
    clearPortableStatuses();
    setAnnouncement("Selected profile schedule cleared.");
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

    const shouldClear = confirmMajorStudentAction("Start this schedule over? This clears the current activities for this profile in this browser.");

    if (!shouldClear) {
      setAnnouncement("Schedule was not cleared.");
      return;
    }

    updateSelectedProfileActivities(() => []);
    setSelectedActivityId(null);
    clearPortableStatuses();
    setAnnouncement("Schedule cleared. Choose activities to add to the schedule.");
  }

  return {
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
  };
}
