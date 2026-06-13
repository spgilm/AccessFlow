/**
 * useTemplateActions
 *
 * Groups schedule-template handlers outside App.jsx.
 */
import { createId } from "../utils/formatters.js";
import {
  cloneActivitiesForProfile,
  cloneActivitiesForTemplate,
} from "../utils/templateHelpers.js";

export function useTemplateActions({
  selectedProfile,
  templates,
  setTemplates,
  updateSelectedProfile,
  setSelectedActivityId,
  clearPortableStatuses,
  setAnnouncement,
}) {
  function handleSaveCurrentScheduleAsTemplate(name, description) {
    if (!selectedProfile) {
      return;
    }

    const template = {
      id: createId("template"),
      name,
      description,
      activities: cloneActivitiesForTemplate(selectedProfile.activities ?? []),
    };

    setTemplates((currentTemplates) => [...currentTemplates, template]);
    clearPortableStatuses();
    setAnnouncement(`${name} template saved.`);
  }

  function handleApplyTemplateToProfile(templateId) {
    const template = templates.find((item) => item.id === templateId);

    if (!template || !selectedProfile) {
      return;
    }

    const clonedActivities = cloneActivitiesForProfile(template.activities);

    updateSelectedProfile((profile) => ({
      ...profile,
      activities: clonedActivities,
    }));

    setSelectedActivityId(clonedActivities[0]?.id ?? null);
    clearPortableStatuses();
    setAnnouncement(`${template.name} applied to ${selectedProfile.name}.`);
  }

  function handleDeleteTemplate(templateId) {
    setTemplates((currentTemplates) =>
      currentTemplates.filter((template) => template.id !== templateId)
    );
    clearPortableStatuses();
    setAnnouncement("Template deleted.");
  }

  return {
    handleSaveCurrentScheduleAsTemplate,
    handleApplyTemplateToProfile,
    handleDeleteTemplate,
  };
}
