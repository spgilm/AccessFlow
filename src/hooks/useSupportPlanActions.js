/**
 * useSupportPlanActions
 *
 * Groups check-in, reinforcement, regulation, reward, and session-note actions.
 */
import { getTodayDateKey } from "../utils/documentationHelpers.js";
import { createId } from "../utils/formatters.js";

export function useSupportPlanActions({
  documentationDate,
  updateSelectedProfile,
  recordSupportEvent,
  clearPortableStatuses,
  setAnnouncement,
}) {
  function handleRecordCheckIn(partialCheckIn) {
    const nextCheckIn = {
      id: createId("checkin"),
      date: getTodayDateKey(),
      createdAt: new Date().toISOString(),
      ...partialCheckIn,
    };

    updateSelectedProfile((profile) => ({
      ...profile,
      checkIns: [...(profile.checkIns ?? []), nextCheckIn],
    }));

    recordSupportEvent({
      type: "student-check-in",
      label: Object.entries(partialCheckIn)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; "),
      activityId: null,
      activityLabel: null,
    });

    clearPortableStatuses();
    setAnnouncement("Check-in recorded.");
  }

  function handleUpdateReinforcementSettings(nextSettings) {
    updateSelectedProfile((profile) => ({
      ...profile,
      reinforcementSettings: nextSettings,
    }));

    clearPortableStatuses();
    setAnnouncement("Reinforcement settings updated.");
  }

  function handleRequestReward(reward) {
    recordSupportEvent({
      type: "reward-request",
      label: `Requested reward: ${reward}`,
      activityId: null,
      activityLabel: null,
    });

    setAnnouncement(`${reward} requested.`);
  }

  function handleUpdateRegulationPlan(nextPlan) {
    updateSelectedProfile((profile) => ({
      ...profile,
      regulationPlan: nextPlan,
    }));

    clearPortableStatuses();
    setAnnouncement("Regulation plan updated.");
  }

  function handleUpdateCommunicationSupportSettings(nextSettings) {
    updateSelectedProfile((profile) => ({
      ...profile,
      communicationSupportSettings: nextSettings,
    }));

    clearPortableStatuses();
    setAnnouncement("Communication support settings updated.");
  }

  function handleUpdateSelfAdvocacySupportSettings(nextSettings) {
    updateSelectedProfile((profile) => ({
      ...profile,
      selfAdvocacySupportSettings: nextSettings,
    }));

    clearPortableStatuses();
    setAnnouncement("Self-advocacy support settings updated.");
  }

  function handleUpdateLifeSkillsSettings(nextSettings) {
    updateSelectedProfile((profile) => ({
      ...profile,
      lifeSkillsSettings: nextSettings,
    }));

    clearPortableStatuses();
    setAnnouncement("Life skills settings updated.");
  }

  function handleUpdateAacExpansionSettings(nextSettings) {
    updateSelectedProfile((profile) => ({
      ...profile,
      aacExpansionSettings: nextSettings,
    }));

    clearPortableStatuses();
    setAnnouncement("AAC expansion settings updated.");
  }

  function handleUpdateAboutMeProfile(nextProfile) {
    updateSelectedProfile((profile) => ({
      ...profile,
      aboutMeProfile: nextProfile,
    }));

    clearPortableStatuses();
    setAnnouncement("About Me profile updated.");
  }

  function handleAddSupportObservation(observation) {
    const nextObservation = {
      id: createId("support-observation"),
      date: documentationDate,
      createdAt: new Date().toISOString(),
      ...observation,
    };

    updateSelectedProfile((profile) => ({
      ...profile,
      supportObservations: [...(profile.supportObservations ?? []), nextObservation],
    }));

    recordSupportEvent({
      type: "staff-observation",
      label: observation.whatHappened || observation.supportOffered || "Staff support observation recorded.",
      activityId: observation.activityId || null,
      activityLabel: observation.activityLabel || null,
    });

    clearPortableStatuses();
    setAnnouncement("Support observation saved.");
  }

  function handleAddSessionNote(note) {
    const nextNote = {
      id: createId("session-note"),
      date: documentationDate,
      createdAt: new Date().toISOString(),
      ...note,
    };

    updateSelectedProfile((profile) => ({
      ...profile,
      sessionNotes: [...(profile.sessionNotes ?? []), nextNote],
    }));

    clearPortableStatuses();
    setAnnouncement("Session note saved.");
  }

  return {
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
  };
}
