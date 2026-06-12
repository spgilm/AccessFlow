/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { starterActivities } from "./starterActivities.js";
import { createId } from "../utils/formatters.js";
import { defaultIndependenceSettings } from "./independenceSettings.js";
import { defaultDisplaySettings } from "./displaySettings.js";
import { defaultChoiceBoardItems } from "./choiceBoardItems.js";

export const starterProfiles = [
  {
    id: createId("profile"),
    name: "Demo Student",
    notes:
      "Sample profile for testing AccessFlow. Replace this with the student/client's real support notes.",
    activities: starterActivities,
    activityBank: [],
    choiceBoardItems: defaultChoiceBoardItems,
    supportEvents: [],
    schedulesByDate: {},
    firstThenBoard: { firstChoiceId: "", thenChoiceId: "" },
    displaySettings: { ...defaultDisplaySettings },
    independenceSettings: { ...defaultIndependenceSettings },
    documentationByDate: {},
  },
];

export function createBlankProfile(name = "New Student") {
  return {
    id: createId("profile"),
    name,
    notes: "",
    activities: [],
    activityBank: [],
    choiceBoardItems: defaultChoiceBoardItems,
    supportEvents: [],
    schedulesByDate: {},
    firstThenBoard: { firstChoiceId: "", thenChoiceId: "" },
    displaySettings: { ...defaultDisplaySettings },
    independenceSettings: { ...defaultIndependenceSettings },
    documentationByDate: {},
  };
}
