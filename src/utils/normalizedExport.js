/**
 * Normalized export scaffold.
 *
 * This converts the current snapshot-shaped data into table-like arrays that
 * match the direction of the v20/v23 normalized Supabase schema.
 */
export function buildNormalizedWorkspaceExport({ profiles = [], templates = [] } = {}) {
  const normalized = {
    exportedAt: new Date().toISOString(),
    schema: "accessflow-normalized-v23",
    profiles: [],
    schedules: [],
    activities: [],
    steps: [],
    supportEvents: [],
    progressGoals: [],
    dailyNotes: [],
    choiceBoardItems: [],
    visualLibraryItems: [],
    templates,
  };

  profiles.forEach((profile) => {
    normalized.profiles.push({
      id: profile.id,
      name: profile.name,
      notes: profile.notes ?? "",
      displaySettings: profile.displaySettings ?? {},
      independenceSettings: profile.independenceSettings ?? {},
      transitionSettings: profile.transitionSettings ?? {},
      reinforcementSettings: profile.reinforcementSettings ?? {},
      regulationPlan: profile.regulationPlan ?? {},
    });

    const schedulesByDate = profile.schedulesByDate ?? {};
    const scheduleDates = Object.keys(schedulesByDate);

    if (scheduleDates.length === 0 && Array.isArray(profile.activities)) {
      normalized.schedules.push({
        id: `${profile.id}-legacy-schedule`,
        profileId: profile.id,
        scheduleDate: "legacy",
      });

      profile.activities.forEach((activity, index) => {
        addActivityRows(normalized, activity, `${profile.id}-legacy-schedule`, index);
      });
    }

    scheduleDates.forEach((dateKey) => {
      const scheduleId = `${profile.id}-${dateKey}`;

      normalized.schedules.push({
        id: scheduleId,
        profileId: profile.id,
        scheduleDate: dateKey,
      });

      (schedulesByDate[dateKey]?.activities ?? []).forEach((activity, index) => {
        addActivityRows(normalized, activity, scheduleId, index);
      });
    });

    (profile.supportEvents ?? []).forEach((event) => {
      normalized.supportEvents.push({
        ...event,
        profileId: profile.id,
      });
    });

    (profile.progressGoals ?? []).forEach((goal) => {
      normalized.progressGoals.push({
        ...goal,
        profileId: profile.id,
      });
    });

    Object.entries(profile.documentationByDate ?? {}).forEach(([dateKey, note]) => {
      normalized.dailyNotes.push({
        ...note,
        profileId: profile.id,
        date: dateKey,
      });
    });

    (profile.choiceBoardItems ?? []).forEach((item, index) => {
      normalized.choiceBoardItems.push({
        ...item,
        profileId: profile.id,
        sortOrder: index,
      });
    });

    (profile.visualLibrary ?? []).forEach((item) => {
      normalized.visualLibraryItems.push({
        ...item,
        profileId: profile.id,
      });
    });
  });

  return normalized;
}

function addActivityRows(normalized, activity, scheduleId, sortOrder) {
  normalized.activities.push({
    id: activity.id,
    scheduleId,
    label: activity.label,
    visual: activity.visual ?? null,
    completed: Boolean(activity.completed),
    sortOrder,
    timerMinutes: activity.timerMinutes ?? 0,
    category: activity.category ?? "General",
  });

  (activity.steps ?? []).forEach((step, index) => {
    normalized.steps.push({
      id: step.id,
      activityId: activity.id,
      label: step.label,
      visual: step.visual ?? null,
      completed: Boolean(step.completed),
      promptLevel: step.promptLevel ?? "",
      timerMinutes: step.timerMinutes ?? 0,
      sortOrder: index,
    });
  });
}
