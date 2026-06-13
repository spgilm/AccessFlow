/**
 * Data health helpers for prototype safety checks.
 *
 * These checks do not prove compliance. They help staff/developers identify
 * prototype risks before using AccessFlow with real workflows.
 */
function getVisualSize(visual) {
  if (!visual || typeof visual !== "object") {
    return 0;
  }

  if (visual.type === "image" && typeof visual.value === "string") {
    return visual.value.length;
  }

  return JSON.stringify(visual).length;
}

function collectVisualsFromActivity(activity) {
  return [
    activity.visual,
    ...(activity.steps ?? []).map((step) => step.visual),
  ].filter(Boolean);
}

export function analyzeWorkspaceData({ profiles = [], templates = [] } = {}) {
  const warnings = [];
  let activityCount = 0;
  let stepCount = 0;
  let supportEventCount = 0;
  let goalCount = 0;
  let visualCount = 0;
  let largeVisualCount = 0;
  let imagePayloadCharacters = 0;

  profiles.forEach((profile) => {
    const schedulesByDate = profile.schedulesByDate ?? {};
    const scheduleEntries = Object.values(schedulesByDate);
    const activities = scheduleEntries.length > 0
      ? scheduleEntries.flatMap((schedule) => schedule.activities ?? [])
      : profile.activities ?? [];

    activityCount += activities.length;
    stepCount += activities.reduce((total, activity) => total + (activity.steps?.length ?? 0), 0);
    supportEventCount += profile.supportEvents?.length ?? 0;
    goalCount += profile.progressGoals?.length ?? 0;

    activities.forEach((activity) => {
      collectVisualsFromActivity(activity).forEach((visual) => {
        const size = getVisualSize(visual);
        visualCount += 1;
        imagePayloadCharacters += visual?.type === "image" ? size : 0;

        if (visual?.type === "image" && size > 250000) {
          largeVisualCount += 1;
        }
      });
    });

    (profile.visualLibrary ?? []).forEach((item) => {
      const size = getVisualSize(item.visual);
      visualCount += 1;
      imagePayloadCharacters += item.visual?.type === "image" ? size : 0;

      if (item.visual?.type === "image" && size > 250000) {
        largeVisualCount += 1;
      }
    });

    if (!profile.displaySettings) {
      warnings.push(`${profile.name ?? "A profile"} is missing display settings.`);
    }

    if ((profile.activities?.length ?? 0) > 0 && Object.keys(schedulesByDate).length === 0) {
      warnings.push(`${profile.name ?? "A profile"} still has legacy activities without dated schedules.`);
    }
  });

  if (profiles.length === 0) {
    warnings.push("No profiles exist.");
  }

  if (largeVisualCount > 0) {
    warnings.push(`${largeVisualCount} large uploaded image visual(s) may make cloud snapshots slow.`);
  }

  if (imagePayloadCharacters > 1500000) {
    warnings.push("Image data payload is large. Consider remote image storage before production use.");
  }

  if (supportEventCount > 200) {
    warnings.push("Support event history is growing. A normalized backend should store events as rows.");
  }

  return {
    profileCount: profiles.length,
    templateCount: templates.length,
    activityCount,
    stepCount,
    supportEventCount,
    goalCount,
    visualCount,
    largeVisualCount,
    imagePayloadCharacters,
    estimatedSnapshotCharacters: JSON.stringify({ profiles, templates }).length,
    warnings,
  };
}

export function getPrototypeSafetyChecklist() {
  return [
    "Only mock student/client data is being used.",
    "No protected health, education, or agency records are entered.",
    "Exports are treated as prototype files, not official records.",
    "Staff understand snapshot sync is not a production audit trail.",
    "Uploaded images do not contain real student/client faces or private information.",
    "The team understands HIPAA/FERPA/compliance review has not happened.",
  ];
}
