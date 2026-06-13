/**
 * useProfileActions
 *
 * Groups profile create/select/update/delete/reset handlers outside App.jsx.
 */
import { createBlankProfile, starterProfiles } from "../data/starterProfiles.js";
import { starterTemplates } from "../data/starterTemplates.js";
import { getTodayDateKey } from "../utils/documentationHelpers.js";

export function useProfileActions({
  profiles,
  selectedProfileId,
  setProfiles,
  setTemplates,
  setSelectedProfileId,
  setSelectedActivityId,
  setDocumentationDate,
  clearPortableStatuses,
  setAnnouncement,
}) {
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

  function handleResetDemo() {
    setProfiles(starterProfiles);
    setTemplates(starterTemplates);
    setSelectedProfileId(starterProfiles[0]?.id ?? null);
    setSelectedActivityId(starterProfiles[0]?.activities[0]?.id ?? null);
    setDocumentationDate(getTodayDateKey());
    clearPortableStatuses();
    setAnnouncement("Demo data reset.");
  }

  return {
    handleSelectProfile,
    handleAddProfile,
    handleUpdateProfile,
    handleDeleteProfile,
    handleResetDemo,
  };
}
