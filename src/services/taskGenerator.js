/**
 * Task-analysis generator. Converts typed/dictated task names into activities and smaller steps.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { activityTemplates, fallbackEmojiRules } from "../data/activityTemplates.js";
import { createEmojiVisual } from "./imageProvider.js";
import { createId, normalizeTaskText, toDisplayLabel } from "../utils/formatters.js";

function resolveTemplate(taskText) {
  const normalized = normalizeTaskText(taskText);
  const directMatch = activityTemplates[normalized];

  if (!directMatch) {
    return null;
  }

  if (directMatch.aliasOf) {
    return activityTemplates[directMatch.aliasOf] ?? null;
  }

  return directMatch;
}

function guessEmoji(normalizedTaskText) {
  const tokens = normalizedTaskText.split(" ");

  const match = fallbackEmojiRules.find((rule) =>
    rule.includes.some((word) => tokens.includes(word) || normalizedTaskText.includes(word))
  );

  return match?.emoji ?? "⭐";
}

function createFallbackSteps(taskText, emoji) {
  return [
    { label: `Get ready for ${taskText}`, emoji: "👀" },
    { label: `Start ${taskText}`, emoji },
    { label: "Keep going", emoji: "➡️" },
    { label: `Finish ${taskText}`, emoji: "✅" },
  ];
}

/**
 * Local task generator.
 *
 * This is shaped like an async AI call on purpose, so it can later be replaced
 * with a real backend AI endpoint without changing the React components.
 */
export async function generateActivityFromTask(taskText, options = {}) {
  const normalized = normalizeTaskText(taskText);

  if (!normalized) {
    throw new Error("Task text is required.");
  }

  const customStepLabels = Array.isArray(options.customSteps)
    ? options.customSteps
        .map((step) => String(step ?? "").trim())
        .filter(Boolean)
    : [];

  const template = resolveTemplate(normalized);
  const label = template?.label ?? toDisplayLabel(normalized);
  const emoji = template?.emoji ?? guessEmoji(normalized);
  const templateSteps = template?.steps ?? createFallbackSteps(normalized, emoji);
  const steps =
    customStepLabels.length > 0
      ? customStepLabels.map((stepLabel, index) => ({
          label: stepLabel,
          emoji:
            index === customStepLabels.length - 1
              ? "✅"
              : guessEmoji(normalizeTaskText(stepLabel)),
        }))
      : templateSteps;
  const summary =
    customStepLabels.length > 0
      ? `Complete ${normalized} using student-created steps.`
      : template?.summary ?? `Complete ${normalized} using simple steps.`;

  return {
    id: createId("activity"),
    label,
    sourceText: normalized,
    summary,
    visual: createEmojiVisual(emoji, `${label} visual`),
    completed: false,
    steps: steps.map((step) => ({
      id: createId("step"),
      label: step.label,
      visual: createEmojiVisual(step.emoji, `${step.label} visual`),
      completed: false,
    })),
  };
}
