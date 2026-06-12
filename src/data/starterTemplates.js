/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { starterActivities } from "./starterActivities.js";
import { createId } from "../utils/formatters.js";

function cloneActivityForTemplate(activity) {
  return {
    ...activity,
    id: createId("template-activity"),
    completed: false,
    steps: activity.steps.map((step) => ({
      ...step,
      id: createId("template-step"),
      completed: false,
    })),
  };
}

export const starterTemplates = [
  {
    id: createId("template"),
    name: "Morning Routine",
    description: "A starter morning schedule using breakfast and tooth brushing.",
    activities: starterActivities.map(cloneActivityForTemplate),
  },
];
