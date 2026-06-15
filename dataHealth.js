/**
 * Clone helpers that safely copy activities between profile schedules, templates, and choice banks.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { createId } from "./formatters.js";

export function cloneActivitiesForProfile(activities) {
  return activities.map((activity) => ({
    ...activity,
    id: createId("activity"),
    completed: false,
    pendingReview: false,
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

export function cloneActivityForChoiceBank(activity) {
  return {
    ...activity,
    id: createId("bank-activity"),
    completed: false,
    pendingReview: false,
    steps: activity.steps.map((step) => ({
      ...step,
      id: createId("bank-step"),
      completed: false,
    })),
  };
}

export function cloneBankChoiceForSchedule(choice) {
  return {
    ...choice,
    id: createId("activity"),
    completed: false,
    pendingReview: false,
    steps: choice.steps.map((step) => ({
      ...step,
      id: createId("step"),
      completed: false,
    })),
  };
}
