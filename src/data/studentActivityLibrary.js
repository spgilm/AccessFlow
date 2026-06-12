/**
 * Source file for AccessFlow. Provides part of the app's student, staff, data, service, or utility layer.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { activityTemplates } from "./activityTemplates.js";

export const studentActivityLibrary = Object.entries(activityTemplates)
  .filter(([, template]) => !template.aliasOf)
  .map(([taskText, template]) => ({
    id: `library-${taskText.replace(/[^a-z0-9]+/g, "-")}`,
    taskText,
    label: template.label,
    summary: template.summary,
    emoji: template.emoji,
  }));
