/**
 * Activity readiness helpers.
 *
 * Summarizes prep, reflection, try-again-later, support events, and staff
 * observations into staff-readable activity readiness patterns.
 */
const readinessTypes = new Set([
  "activity-prep",
  "activity-reflection",
  "try-again-later",
  "schedule-change-request",
  "stuck-pathway",
  "help-request-builder",
  "sensory-request",
  "staff-observation",
]);

export function buildTryAgainQueue(supportEvents = []) {
  return supportEvents
    .filter((event) => event.type === "try-again-later")
    .slice()
    .sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")))
    .slice(0, 12);
}

export function buildActivityReadinessSummary({ activities = [], supportEvents = [], supportObservations = [] } = {}) {
  const activityRows = new Map();

  activities.forEach((activity) => {
    activityRows.set(activity.id, {
      activityId: activity.id,
      activityLabel: activity.label,
      prepCount: 0,
      reflectionCount: 0,
      tryLaterCount: 0,
      supportCount: 0,
      observationCount: 0,
      difficultyLabels: [],
      whatHelped: [],
      recent: [],
    });
  });

  supportEvents
    .filter((event) => readinessTypes.has(event.type))
    .forEach((event) => {
      const key = event.activityId || event.activityLabel || "general";
      const current =
        activityRows.get(key) ??
        {
          activityId: event.activityId || key,
          activityLabel: event.activityLabel || "General / unlinked",
          prepCount: 0,
          reflectionCount: 0,
          tryLaterCount: 0,
          supportCount: 0,
          observationCount: 0,
          difficultyLabels: [],
          whatHelped: [],
          recent: [],
        };

      if (event.type === "activity-prep") current.prepCount += 1;
      if (event.type === "activity-reflection") {
        current.reflectionCount += 1;
        current.difficultyLabels.push(event.label);
      }
      if (event.type === "try-again-later") current.tryLaterCount += 1;
      current.supportCount += 1;
      current.recent.push(event);

      activityRows.set(key, current);
    });

  supportObservations.forEach((observation) => {
    const key = observation.activityId || observation.activityLabel || "general";
    const current =
      activityRows.get(key) ??
      {
        activityId: observation.activityId || key,
        activityLabel: observation.activityLabel || "General / unlinked",
        prepCount: 0,
        reflectionCount: 0,
        tryLaterCount: 0,
        supportCount: 0,
        observationCount: 0,
        difficultyLabels: [],
        whatHelped: [],
        recent: [],
      };

    current.observationCount += 1;
    if (observation.supportOffered) current.whatHelped.push(observation.supportOffered);
    if (observation.nextTime) current.whatHelped.push(observation.nextTime);
    current.recent.push({
      type: "staff-observation",
      label: observation.whatHappened || observation.supportOffered || "Staff observation",
      createdAt: observation.createdAt,
      activityId: observation.activityId,
      activityLabel: observation.activityLabel,
    });

    activityRows.set(key, current);
  });

  return Array.from(activityRows.values())
    .filter((row) => row.supportCount || row.observationCount)
    .map((row) => ({
      ...row,
      whatHelped: Array.from(new Set(row.whatHelped.filter(Boolean))).slice(0, 4),
      recent: row.recent
        .slice()
        .sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")))
        .slice(0, 4),
    }))
    .sort(
      (a, b) =>
        b.tryLaterCount +
        b.reflectionCount +
        b.supportCount +
        b.observationCount -
        (a.tryLaterCount + a.reflectionCount + a.supportCount + a.observationCount)
    );
}
