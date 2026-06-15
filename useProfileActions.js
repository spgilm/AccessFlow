/**
 * useScheduleCopyActions
 *
 * Groups staff schedule-copy actions outside App.jsx.
 */
import { getTomorrowDateKey, getWeekdayDateKeysFromDate } from "../utils/dateCopyHelpers.js";
import { cloneActivitiesForProfile } from "../utils/templateHelpers.js";

export function useScheduleCopyActions({
  scheduleDate,
  activities,
  updateSelectedProfile,
  clearPortableStatuses,
  setAnnouncement,
}) {
  function handleApplyCurrentScheduleToTomorrow() {
    const targetDate = getTomorrowDateKey(scheduleDate);
    const copiedActivities = cloneActivitiesForProfile(activities);

    updateSelectedProfile((profile) => ({
      ...profile,
      schedulesByDate: {
        ...(profile.schedulesByDate ?? {}),
        [targetDate]: {
          date: targetDate,
          activities: copiedActivities,
          updatedAt: new Date().toISOString(),
        },
      },
    }));

    clearPortableStatuses();
    setAnnouncement(`Current schedule copied to ${targetDate}.`);
  }

  function handleApplyCurrentScheduleToWeek() {
    const weekdayKeys = getWeekdayDateKeysFromDate(scheduleDate);
    const nextSchedules = {};

    weekdayKeys.forEach((dateKey) => {
      nextSchedules[dateKey] = {
        date: dateKey,
        activities: cloneActivitiesForProfile(activities),
        updatedAt: new Date().toISOString(),
      };
    });

    updateSelectedProfile((profile) => ({
      ...profile,
      schedulesByDate: {
        ...(profile.schedulesByDate ?? {}),
        ...nextSchedules,
      },
    }));

    clearPortableStatuses();
    setAnnouncement("Current schedule copied to the selected weekday week.");
  }

  return {
    handleApplyCurrentScheduleToTomorrow,
    handleApplyCurrentScheduleToWeek,
  };
}
