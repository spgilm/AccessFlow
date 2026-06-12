/**
 * Date-based schedule helpers.
 *
 * AccessFlow originally stored the active schedule directly on `profile.activities`.
 * v15 keeps that field for backward compatibility, but adds `profile.schedulesByDate`
 * so staff can prepare different visual schedules for different calendar dates.
 */

export function getScheduleForDate(profile, dateKey) {
  if (!profile) {
    return [];
  }

  const datedActivities = profile.schedulesByDate?.[dateKey]?.activities;

  if (Array.isArray(datedActivities)) {
    return datedActivities;
  }

  return Array.isArray(profile.activities) ? profile.activities : [];
}

export function updateProfileScheduleForDate(profile, dateKey, updater) {
  const currentActivities = getScheduleForDate(profile, dateKey);
  const nextActivities = updater(currentActivities);

  return {
    ...profile,
    activities: nextActivities,
    schedulesByDate: {
      ...(profile.schedulesByDate ?? {}),
      [dateKey]: {
        date: dateKey,
        activities: nextActivities,
        updatedAt: new Date().toISOString(),
      },
    },
  };
}

export function normalizeSchedulesByDate(profile) {
  if (profile?.schedulesByDate && typeof profile.schedulesByDate === "object") {
    return profile.schedulesByDate;
  }

  return {};
}
