import { starterActivities } from "./starterActivities.js";
import { createId } from "../utils/formatters.js";
import { defaultIndependenceSettings } from "./independenceSettings.js";
import { defaultDisplaySettings } from "./displaySettings.js";

export const starterProfiles = [
  {
    id: createId("profile"),
    name: "Demo Student",
    notes:
      "Sample profile for testing AccessFlow. Replace this with the student/client's real support notes.",
    activities: starterActivities,
    activityBank: [],
    supportEvents: [],
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
    supportEvents: [],
    firstThenBoard: { firstChoiceId: "", thenChoiceId: "" },
    displaySettings: { ...defaultDisplaySettings },
    independenceSettings: { ...defaultIndependenceSettings },
    documentationByDate: {},
  };
}
