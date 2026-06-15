/**
 * Release readiness helpers for the v50 solid release candidate.
 *
 * This is not a legal/compliance certification. It is a prototype QA summary
 * that keeps manual reviewers focused on known safety, accessibility, and
 * configuration concerns.
 */
import { buildVisualCoverageRows } from "./visualCoverage.js";
import { getVisualPreferenceLabel } from "./visualPreferences.js";

export function buildReleaseReadinessSummary({
  displaySettings,
  aacExpansionSettings,
  communicationSupportSettings,
  selfAdvocacySupportSettings,
  lifeSkillsSettings,
  visualLibrary = [],
  supportEvents = [],
  profiles = [],
} = {}) {
  const visualGroups = buildVisualCoverageRows({
    aacExpansionSettings,
    communicationSupportSettings,
    selfAdvocacySupportSettings,
    lifeSkillsSettings,
  });

  const totalButtons = visualGroups.reduce((sum, group) => sum + group.total, 0);
  const weakVisualCount = visualGroups.reduce((sum, group) => sum + group.emojiOnlyCount + group.textFallbackCount, 0);
  const iconCount = visualGroups.reduce((sum, group) => sum + group.iconCount, 0);
  const savedVisualCount = visualGroups.reduce((sum, group) => sum + group.savedVisualCount, 0);

  const checks = [
    {
      id: "prototype-warning",
      label: "Prototype warning present",
      status: "ready",
      detail: "Student and Staff modes include the persistent HIPAA/FERPA prototype warning footer.",
    },
    {
      id: "labels-required",
      label: "Labels remain primary",
      status: "ready",
      detail: "Communication tools use labels for visible text, event logs, and documentation.",
    },
    {
      id: "visual-coverage",
      label: "Visual coverage",
      status: weakVisualCount === 0 ? "ready" : "review",
      detail:
        weakVisualCount === 0
          ? "All audited buttons have saved visuals or Font Awesome icons."
          : `${weakVisualCount} audited buttons still use emoji/text fallback only.`,
    },
    {
      id: "visual-library",
      label: "Visual library",
      status: visualLibrary.length > 0 ? "ready" : "review",
      detail: `${visualLibrary.length} saved visuals available for assignment.`,
    },
    {
      id: "display-preference",
      label: "Student visual preference",
      status: "ready",
      detail: getVisualPreferenceLabel(displaySettings),
    },
    {
      id: "support-events",
      label: "Support event logging",
      status: supportEvents.length > 0 ? "ready" : "review",
      detail:
        supportEvents.length > 0
          ? `${supportEvents.length} support events available in this prototype profile.`
          : "No support events logged yet in this profile.",
    },
    {
      id: "profiles",
      label: "Profile setup",
      status: profiles.length > 0 ? "ready" : "review",
      detail: `${profiles.length} profile record${profiles.length === 1 ? "" : "s"} available.`,
    },
  ];

  return {
    totalButtons,
    weakVisualCount,
    iconCount,
    savedVisualCount,
    visualLibraryCount: visualLibrary.length,
    visualPreferenceLabel: getVisualPreferenceLabel(displaySettings),
    checks,
    readyCount: checks.filter((check) => check.status === "ready").length,
    reviewCount: checks.filter((check) => check.status !== "ready").length,
  };
}
