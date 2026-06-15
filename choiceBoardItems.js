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
import { defaultVisualLibraryItems } from "./visualLibrary.js";
import { defaultProgressGoals } from "./progressGoals.js";
import { defaultTransitionSettings } from "./transitionSettings.js";
import { defaultReinforcementSettings } from "./reinforcementSettings.js";
import { defaultRegulationPlan } from "./regulationPlan.js";
import { getCommunicationSupportSettings } from "./communicationSupport.js";
import { getSelfAdvocacySupportSettings } from "./selfAdvocacySupport.js";
import { getLifeSkillsSettings } from "./lifeSkillsSettings.js";
import { getAboutMeProfile } from "./aboutMeProfile.js";
import { getAacExpansionSettings } from "./aacExpansion.js";

export const starterProfiles = [
  {
    id: createId("profile"),
    name: "Demo Student",
    notes:
      "Sample profile for testing AccessFlow. Replace this with the student/client's real support notes.",
    activities: starterActivities,
    activityBank: [],
    choiceBoardItems: defaultChoiceBoardItems,
    visualLibrary: defaultVisualLibraryItems,
    progressGoals: defaultProgressGoals,
    transitionSettings: { ...defaultTransitionSettings },
    reinforcementSettings: { ...defaultReinforcementSettings },
    regulationPlan: { ...defaultRegulationPlan },
    communicationSupportSettings: getCommunicationSupportSettings(),
    selfAdvocacySupportSettings: getSelfAdvocacySupportSettings(),
    lifeSkillsSettings: getLifeSkillsSettings(),
    aboutMeProfile: getAboutMeProfile(),
    aacExpansionSettings: getAacExpansionSettings(),
    checkIns: [],
    sessionNotes: [],
    accessibilityReview: {},
    supportEvents: [],
    supportObservations: [],
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
    visualLibrary: defaultVisualLibraryItems,
    progressGoals: defaultProgressGoals,
    transitionSettings: { ...defaultTransitionSettings },
    reinforcementSettings: { ...defaultReinforcementSettings },
    regulationPlan: { ...defaultRegulationPlan },
    communicationSupportSettings: getCommunicationSupportSettings(),
    selfAdvocacySupportSettings: getSelfAdvocacySupportSettings(),
    lifeSkillsSettings: getLifeSkillsSettings(),
    aboutMeProfile: getAboutMeProfile(),
    aacExpansionSettings: getAacExpansionSettings(),
    checkIns: [],
    sessionNotes: [],
    accessibilityReview: {},
    supportEvents: [],
    supportObservations: [],
    schedulesByDate: {},
    firstThenBoard: { firstChoiceId: "", thenChoiceId: "" },
    displaySettings: { ...defaultDisplaySettings },
    independenceSettings: { ...defaultIndependenceSettings },
    documentationByDate: {},
  };
}
