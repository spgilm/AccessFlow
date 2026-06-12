import { getIndependenceSettings } from "../data/independenceSettings.js";

export function normalizeImportedProfile(profile) {
  return {
    id: profile.id,
    name: profile.name || "Imported Profile",
    notes: profile.notes || "",
    activities: Array.isArray(profile.activities) ? profile.activities : [],
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
    mode: data.mode === "staff" ? "staff" : "student",
    studentViewMode: validStudentModes.includes(data.studentViewMode)
      ? data.studentViewMode
      : "schedule",
  };
}
