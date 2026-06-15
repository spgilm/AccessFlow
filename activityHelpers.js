/**
 * useStaffSettingsActions
 *
 * Groups profile support settings, staff security, and role-prototype handlers.
 */
import { getRolePermissions } from "../data/rolePermissions.js";
import { getStaffSecurity } from "../data/securitySettings.js";

export function useStaffSettingsActions({
  updateSelectedProfile,
  clearPortableStatuses,
  setStaffSecurity,
  setRolePermissions,
  setStaffUnlocked,
  setMode,
  setAnnouncement,
}) {
  function handleUpdateTransitionSettings(nextSettings) {
    updateSelectedProfile((profile) => ({
      ...profile,
      transitionSettings: nextSettings,
    }));

    clearPortableStatuses();
    setAnnouncement("Transition settings updated.");
  }

  function handleUpdateAccessibilityReview(nextReview) {
    updateSelectedProfile((profile) => ({
      ...profile,
      accessibilityReview: nextReview,
    }));

    clearPortableStatuses();
  }

  function handleUpdateStaffSecurity(nextSettings) {
    setStaffSecurity(getStaffSecurity(nextSettings));
    setAnnouncement("Staff security settings updated.");
  }

  function handleLockStaff() {
    setStaffUnlocked(false);
    setMode("student");
    setAnnouncement("Staff Mode locked. Student Mode opened.");
  }

  function handleUpdateRolePermissions(nextSettings) {
    setRolePermissions(getRolePermissions(nextSettings));
    setAnnouncement("Role permission prototype updated.");
  }

  return {
    handleUpdateTransitionSettings,
    handleUpdateAccessibilityReview,
    handleUpdateStaffSecurity,
    handleLockStaff,
    handleUpdateRolePermissions,
  };
}
