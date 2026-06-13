/**
 * useFirstThenActions
 *
 * Groups First/Then board handlers outside App.jsx.
 */
import { cloneBankChoiceForSchedule } from "../utils/templateHelpers.js";

export function useFirstThenActions({
  firstThenBoard,
  activityBank,
  selectedProfile,
  selectedActivityId,
  updateSelectedProfile,
  updateSelectedProfileActivities,
  setSelectedActivityId,
  clearPortableStatuses,
  setAnnouncement,
}) {
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

  return {
    handleUpdateFirstThenBoard,
    handleAddFirstThenToSchedule,
  };
}
