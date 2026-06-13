/**
 * useActivityBankActions
 *
 * Groups Student Choices / activity-bank handlers outside App.jsx.
 */
import { generateActivityFromTask } from "../services/taskGenerator.js";
import {
  cloneActivityForChoiceBank,
  cloneBankChoiceForSchedule,
} from "../utils/templateHelpers.js";

function isDuplicateBankChoice(bankChoices, candidate) {
  const candidateKey = String(candidate.sourceText || candidate.label || "").toLowerCase();

  return bankChoices.some((choice) => {
    const choiceKey = String(choice.sourceText || choice.label || "").toLowerCase();
    return choiceKey && candidateKey && choiceKey === candidateKey;
  });
}

export function useActivityBankActions({
  selectedProfile,
  activities,
  activityBank,
  updateSelectedProfile,
  updateSelectedProfileActivities,
  handleUpdateActivity,
  setSelectedActivityId,
  clearPortableStatuses,
  setAnnouncement,
}) {
  function updateSelectedProfileActivityBank(updater) {
    updateSelectedProfile((profile) => ({
      ...profile,
      activityBank: updater(profile.activityBank ?? []),
    }));
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

  return {
    handleAddChoiceToBank,
    handleUpdateBankChoice,
    handleSaveActivityToBank,
    handleAddBankChoiceToSchedule,
    handleDeleteBankChoice,
  };
}
