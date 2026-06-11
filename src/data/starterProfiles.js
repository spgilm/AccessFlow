import { starterActivities } from "./starterActivities.js";
import { createId } from "../utils/formatters.js";

export const starterProfiles = [
  {
    id: createId("profile"),
    name: "Demo Student",
    notes:
      "Sample profile for testing AccessFlow. Replace this with the student/client's real support notes.",
    activities: starterActivities,
    documentationByDate: {},
  },
];

export function createBlankProfile(name = "New Student") {
  return {
    id: createId("profile"),
    name,
    notes: "",
    activities: [],
    documentationByDate: {},
  };
}
