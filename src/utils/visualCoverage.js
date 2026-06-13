/**
 * Visual coverage helpers.
 *
 * Audits communication-button items and suggests Font Awesome icons when
 * a label has weak visual support. Labels remain the semantic value.
 */
const keywordIconRules = [
  ["bathroom", "toilet"],
  ["toilet", "toilet"],
  ["help", "help"],
  ["support", "help"],
  ["quiet", "quiet"],
  ["loud", "loud"],
  ["headphone", "headphones"],
  ["break", "pause"],
  ["wait", "clock"],
  ["time", "clock"],
  ["later", "clock"],
  ["yes", "check"],
  ["done", "check"],
  ["finished", "check"],
  ["no", "xmark"],
  ["stop", "stop"],
  ["different", "repeat"],
  ["again", "repeat"],
  ["choice", "comment"],
  ["say", "comment"],
  ["tell", "comment"],
  ["question", "question"],
  ["understand", "question"],
  ["show", "eye"],
  ["look", "eye"],
  ["read", "book"],
  ["book", "book"],
  ["school", "book"],
  ["work", "briefcase"],
  ["job", "briefcase"],
  ["task", "briefcase"],
  ["materials", "briefcase"],
  ["walk", "walk"],
  ["movement", "walk"],
  ["ride", "bus"],
  ["bus", "bus"],
  ["transport", "bus"],
  ["home", "home"],
  ["safe", "safety"],
  ["call", "phone"],
  ["phone", "phone"],
  ["food", "food"],
  ["snack", "food"],
  ["drink", "drink"],
  ["water", "drink"],
  ["sick", "dizzy"],
  ["hurt", "circle-exclamation"],
  ["pain", "circle-exclamation"],
  ["emergency", "circle-exclamation"],
  ["mad", "angry"],
  ["angry", "angry"],
  ["sad", "sad"],
  ["tired", "tired"],
  ["happy", "happy"],
  ["excited", "excited"],
  ["space", "pause"],
  ["clean", "trash"],
  ["trash", "trash"],
  ["clothes", "clothes"],
  ["laundry", "clothes"],
];

export const visualAuditGroups = [
  ["aac.coreWords", "AAC · Core words"],
  ["aac.quickPhrases", "AAC · Quick phrases"],
  ["aac.feelings", "AAC · Feelings"],
  ["aac.intensityLevels", "AAC · Intensity"],
  ["aac.socialScripts", "AAC · Social scripts"],
  ["communication.sensoryRequests", "Communication · Sensory requests"],
  ["self.yesNoResponses", "Self-advocacy · Yes/No"],
  ["self.helpTopics", "Self-advocacy · Help topics"],
  ["self.helpActions", "Self-advocacy · Help actions"],
  ["self.decisionChoices", "Self-advocacy · Decision choices"],
  ["self.stuckReasons", "Self-advocacy · Stuck reasons"],
  ["self.stuckStrategies", "Self-advocacy · Stuck strategies"],
  ["self.scheduleChangeRequests", "Self-advocacy · Schedule change requests"],
  ["life.communityCards", "Life skills · Community cards"],
  ["life.vocationalActions", "Life skills · Vocational actions"],
];

export function getVisualSource(item) {
  if (item?.visual?.type === "image" || item?.imageUrl) return "saved image/photo";
  if (item?.visual?.type === "fontawesome" || item?.icon) return "Font Awesome";
  if (item?.visual?.type === "emoji" || item?.emoji) return "emoji";
  return "text fallback";
}

export function suggestIconForLabel(label = "") {
  const lower = String(label).toLowerCase();

  const match = keywordIconRules.find(([keyword]) => lower.includes(keyword));
  return match?.[1] ?? "comment";
}

export function getByPath(settings, path) {
  const [domain, key] = path.split(".");

  if (domain === "aac") return settings.aacExpansionSettings?.[key] ?? [];
  if (domain === "communication") return settings.communicationSupportSettings?.[key] ?? [];
  if (domain === "self") return settings.selfAdvocacySupportSettings?.[key] ?? [];
  if (domain === "life") return settings.lifeSkillsSettings?.[key] ?? [];

  return [];
}

export function setByPath(settings, path, nextItems) {
  const [domain, key] = path.split(".");

  if (domain === "aac") {
    return {
      ...settings,
      aacExpansionSettings: {
        ...settings.aacExpansionSettings,
        [key]: nextItems,
      },
    };
  }

  if (domain === "communication") {
    return {
      ...settings,
      communicationSupportSettings: {
        ...settings.communicationSupportSettings,
        [key]: nextItems,
      },
    };
  }

  if (domain === "self") {
    return {
      ...settings,
      selfAdvocacySupportSettings: {
        ...settings.selfAdvocacySupportSettings,
        [key]: nextItems,
      },
    };
  }

  if (domain === "life") {
    return {
      ...settings,
      lifeSkillsSettings: {
        ...settings.lifeSkillsSettings,
        [key]: nextItems,
      },
    };
  }

  return settings;
}

export function buildVisualCoverageRows(settings) {
  return visualAuditGroups.map(([path, label]) => {
    const items = getByPath(settings, path);
    const rows = items.map((item) => {
      const source = getVisualSource(item);
      const suggestedIcon = suggestIconForLabel(item.label);
      const needsSuggestion = source === "emoji" || source === "text fallback";

      return {
        ...item,
        source,
        suggestedIcon,
        needsSuggestion,
      };
    });

    return {
      path,
      label,
      total: rows.length,
      savedVisualCount: rows.filter((item) => item.source === "saved image/photo").length,
      iconCount: rows.filter((item) => item.source === "Font Awesome").length,
      emojiOnlyCount: rows.filter((item) => item.source === "emoji").length,
      textFallbackCount: rows.filter((item) => item.source === "text fallback").length,
      rows,
    };
  });
}

export function applySuggestedIconsToSettings(settings) {
  return visualAuditGroups.reduce((current, [path]) => {
    const items = getByPath(current, path);
    const nextItems = items.map((item) => {
      const source = getVisualSource(item);

      if (source === "saved image/photo" || source === "Font Awesome") {
        return item;
      }

      return {
        ...item,
        icon: item.icon || suggestIconForLabel(item.label),
      };
    });

    return setByPath(current, path, nextItems);
  }, settings);
}
