import { createId } from "./formatters.js";

export function cloneActivitiesForProfile(activities) {
  return activities.map((activity) => ({
    ...activity,
    id: createId("activity"),
    completed: false,
    steps: activity.steps.map((step) => ({
      ...step,
      id: createId("step"),
      completed: false,
    })),
  }));
}

export function cloneActivitiesForTemplate(activities) {
  return activities.map((activity) => ({
    ...activity,
    id: createId("template-activity"),
    completed: false,
    steps: activity.steps.map((step) => ({
      ...step,
      id: createId("template-step"),
      completed: false,
    })),
  }));
}
