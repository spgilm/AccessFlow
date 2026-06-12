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
