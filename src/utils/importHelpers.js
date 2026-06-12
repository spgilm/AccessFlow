/**
 * Backup import normalization helpers that preserve profile data while filling missing defaults.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { getIndependenceSettings } from "../data/independenceSettings.js";
import { getDisplaySettings } from "../data/displaySettings.js";
import { normalizeSchedulesByDate } from "./scheduleDateHelpers.js";
import { defaultChoiceBoardItems } from "../data/choiceBoardItems.js";

export function normalizeImportedProfile(profile) {
  return {
    id: profile.id,
    name: profile.name || "Imported Profile",
    notes: profile.notes || "",
    activities: Array.isArray(profile.activities) ? profile.activities : [],
    activityBank: Array.isArray(profile.activityBank) ? profile.activityBank : [],
    choiceBoardItems: Array.isArray(profile.choiceBoardItems) && profile.choiceBoardItems.length > 0 ? profile.choiceBoardItems : defaultChoiceBoardItems,
    supportEvents: Array.isArray(profile.supportEvents) ? profile.supportEvents : [],
    schedulesByDate: normalizeSchedulesByDate(profile),
    firstThenBoard:
      profile.firstThenBoard && typeof profile.firstThenBoard === "object"
        ? profile.firstThenBoard
        : { firstChoiceId: "", thenChoiceId: "" },
    displaySettings: getDisplaySettings(profile),
    independenceSettings: getIndependenceSettings(profile),
    documentationByDate:
      profile.documentationByDate && typeof profile.documentationByDate === "object"
        ? profile.documentationByDate
        : {},
  };
}

export function normalizeImportedTemplate(template) {
  return {
    id: template.id,
    name: template.name || "Imported Template",
    description: template.description || "",
    activities: Array.isArray(template.activities) ? template.activities : [],
  };
}

export function normalizeImportedBackupData(data) {
  const validStudentModes = ["schedule", "firstThen", "builder"];

  return {
    profiles: data.profiles.map(normalizeImportedProfile),
    templates: data.templates.map(normalizeImportedTemplate),
    selectedProfileId: data.selectedProfileId || data.profiles[0]?.id || null,
    documentationDate: data.documentationDate || "",
    scheduleDate: data.scheduleDate || data.documentationDate || "",
    mode: data.mode === "staff" ? "staff" : "student",
    studentViewMode: validStudentModes.includes(data.studentViewMode)
      ? data.studentViewMode
      : "schedule",
  };
}
