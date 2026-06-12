/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
export function updateActivityById(activities, activityId, updater) {
  return activities.map((activity) =>
    activity.id === activityId ? updater(activity) : activity
  );
}

export function moveItemById(items, itemId, direction) {
  const currentIndex = items.findIndex((item) => item.id === itemId);

  if (currentIndex === -1) {
    return items;
  }

  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (targetIndex < 0 || targetIndex >= items.length) {
    return items;
  }

  const nextItems = [...items];
  const [movedItem] = nextItems.splice(currentIndex, 1);
  nextItems.splice(targetIndex, 0, movedItem);

  return nextItems;
}

export function areAllStepsComplete(activity) {
  return activity.steps.length > 0 && activity.steps.every((step) => step.completed);
}

export function getFirstThenActivities(activities) {
  const firstIndex = activities.findIndex((activity) => !activity.completed);

  if (firstIndex === -1) {
    return {
      first: null,
      then: null,
      allDone: activities.length > 0,
    };
  }

  return {
    first: activities[firstIndex] ?? null,
    then: activities[firstIndex + 1] ?? null,
    allDone: false,
  };
}
