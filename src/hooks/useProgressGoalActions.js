/**
 * useProgressGoalActions
 *
 * Groups profile progress-goal mutations outside App.jsx.
 */
import { createProgressGoal, getProgressGoals } from "../data/progressGoals.js";

export function useProgressGoalActions({
  updateSelectedProfile,
  clearPortableStatuses,
  setAnnouncement,
}) {
  function updateSelectedProfileGoals(updater) {
    updateSelectedProfile((profile) => ({
      ...profile,
      progressGoals: updater(getProgressGoals(profile)),
    }));
  }

  function handleAddGoal(goal) {
    updateSelectedProfileGoals((currentGoals) => [
      ...currentGoals,
      createProgressGoal(goal),
    ]);

    clearPortableStatuses();
    setAnnouncement(`${goal.title} goal added.`);
  }

  function handleUpdateGoal(goalId, patch) {
    updateSelectedProfileGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              ...patch,
            }
          : goal
      )
    );

    clearPortableStatuses();
  }

  function handleDeleteGoal(goalId) {
    updateSelectedProfileGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== goalId)
    );

    clearPortableStatuses();
    setAnnouncement("Goal removed.");
  }

  return {
    handleAddGoal,
    handleUpdateGoal,
    handleDeleteGoal,
  };
}
