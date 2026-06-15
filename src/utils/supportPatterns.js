/**
 * Support pattern helpers.
 *
 * Builds lightweight, non-diagnostic summaries from support events and staff
 * observations. These summaries support staff review; they are not clinical
 * conclusions.
 */
export function buildActivitySupportPatterns({ activities = [], supportEvents = [], supportObservations = [] } = {}) {
  const activityMap = new Map();

  activities.forEach((activity) => {
    activityMap.set(activity.id, {
      activityId: activity.id,
      activityLabel: activity.label,
      eventCount: 0,
      observationCount: 0,
      worked: [],
      hard: [],
      recent: [],
    });
  });

  supportEvents.forEach((event) => {
    if (!event.activityId && !event.activityLabel) {
      return;
    }

    const key = event.activityId ?? event.activityLabel;
    const current =
      activityMap.get(key) ??
      {
        activityId: event.activityId ?? key,
        activityLabel: event.activityLabel ?? "Unlinked activity",
        eventCount: 0,
        observationCount: 0,
        worked: [],
        hard: [],
        recent: [],
      };

    current.eventCount += 1;
    current.recent.push({
      type: event.type,
      label: event.label,
      createdAt: event.createdAt,
    });

    activityMap.set(key, current);
  });

  supportObservations.forEach((observation) => {
    const key = observation.activityId || observation.activityLabel || "general";
    const current =
      activityMap.get(key) ??
      {
        activityId: observation.activityId ?? key,
        activityLabel: observation.activityLabel || "General support",
        eventCount: 0,
        observationCount: 0,
        worked: [],
        hard: [],
        recent: [],
      };

    current.observationCount += 1;

    if (observation.didItHelp === "yes" || observation.didItHelp === "somewhat") {
      current.worked.push(observation.supportOffered || observation.nextTime || "Support helped");
    }

    if (observation.whatHappened) {
      current.hard.push(observation.whatHappened);
    }

    current.recent.push({
      type: "staff-observation",
      label: observation.supportOffered || observation.whatHappened || "Staff observation",
      createdAt: observation.createdAt,
    });

    activityMap.set(key, current);
  });

  return Array.from(activityMap.values())
    .filter((item) => item.eventCount > 0 || item.observationCount > 0)
    .map((item) => ({
      ...item,
      recent: item.recent
        .slice()
        .sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")))
        .slice(0, 3),
      worked: Array.from(new Set(item.worked.filter(Boolean))).slice(0, 4),
      hard: Array.from(new Set(item.hard.filter(Boolean))).slice(0, 4),
    }))
    .sort((a, b) => b.eventCount + b.observationCount - (a.eventCount + a.observationCount));
}

export function getWhatWorkedLastTime(patterns = [], activityId) {
  const pattern = patterns.find((item) => item.activityId === activityId);

  if (!pattern) {
    return null;
  }

  return {
    activityLabel: pattern.activityLabel,
    worked: pattern.worked,
    recent: pattern.recent,
  };
}
