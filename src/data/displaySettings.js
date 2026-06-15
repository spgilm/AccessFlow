/**
 * Student display/accessibility settings.
 *
 * These settings let staff adapt Student Mode for different access needs.
 * The same student can use a very simple interface, a communication-board-only
 * interface, a First/Then-only interface, or the full advanced workflow.
 */
export const defaultDisplaySettings = {
  interfaceLevel: "standard",
  studentModeLayout: "tabs",
  studentPanelLayout: "grouped",
  touchSize: "standard",
  textDisplay: "iconsAndWords",
  visualPreference: "balanced",
  studentNavigationPreset: "core",
  showProfileTab: false,
  showScheduleTab: true,
  showChooseTab: false,
  showMakeTab: false,
  showChoiceBoardTab: true,
  showHelpTab: true,
  showRelaxTab: true,
  showGamesTab: false,
  showGuidedScheduleBuilder: true,
  showAboutMePanel: true,
  showWords: true,
  showProgress: true,
  showStepNumbers: true,
  showPromptControls: true,
  showTimers: true,
  showScheduleDate: true,
  showCheckIn: true,
  showRewardBoard: true,
  showSupportButtons: true,
  showBreakPlan: true,
  showTransitionSupports: true,
  showPainBodyPanel: true,
  showSensoryPanel: true,
  showRegulationPathway: true,
  showWaitingSupport: true,
  showYesNoPanel: true,
  showHelpRequestBuilder: true,
  showDecisionSupport: true,
  showStuckPathway: true,
  showScheduleChangeRequest: true,
  showCommunityAccessPanel: true,
  showVocationalTaskPanel: true,
  showActivityPrepPanel: true,
  showActivityReflectionPanel: true,
  showTryAgainLaterPanel: true,
  showCalmScreenPanel: true,
  showCommunicationRepairPanel: true,
  showSwitchScannerPanel: true,
  showCoreWordsPanel: true,
  showQuickPhrasesPanel: true,
  showFeelingsIntensityPanel: true,
  showSocialScriptsPanel: true,
  reducedChoiceMode: false,
  eyeGazeFriendly: false,
  showBoardActivitySection: true,
  showStudentToolSummary: true,
  reduceMotion: false,
  confirmBeforeMajorActions: true,
  playAudioFeedback: false,
  defaultStudentView: "schedule",
};

export function getDisplaySettings(profile) {
  return {
    ...defaultDisplaySettings,
    ...(profile?.displaySettings ?? {}),
  };
}

export const studentNavigationPresets = [
  {
    id: "core",
    label: "Core: Schedule, Add, Talk, Help, Calm, Play",
    description: "Default layout with schedule-building, communication, support, calm, and play visible.",
    tabs: ["schedule", "choose", "board", "help", "relax", "games"],
  },
  {
    id: "simple",
    label: "Simple: Schedule, Help, Calm",
    description: "Lowest-clutter layout for students who need fewer choices.",
    tabs: ["schedule", "help", "relax"],
  },
  {
    id: "communication",
    label: "Communication: Talk, Help, Calm, Schedule",
    description: "Prioritizes communication and support tools.",
    tabs: ["board", "help", "relax", "schedule"],
  },
  {
    id: "builder",
    label: "Builder: Schedule, Choose, Make, Help",
    description: "For students practicing schedule planning and autonomy.",
    tabs: ["schedule", "choose", "make", "help"],
  },
  {
    id: "full",
    label: "Full: Me, Schedule, Choose, Make, Talk, Help, Calm, Games",
    description: "Shows the complete advanced Student Mode.",
    tabs: ["profile", "schedule", "choose", "make", "board", "help", "relax", "games"],
  },
  {
    id: "custom",
    label: "Custom toggles",
    description: "Uses the individual tab visibility checkboxes.",
    tabs: [],
  },
];

const studentTabDefinitions = {
  profile: { id: "profile", label: "Me" },
  schedule: { id: "schedule", label: "Schedule" },
  choose: { id: "choose", label: "Add" },
  make: { id: "make", label: "Make" },
  board: { id: "board", label: "Talk" },
  help: { id: "help", label: "Help" },
  relax: { id: "relax", label: "Calm" },
  games: { id: "games", label: "Play" },
};

function buildTabsFromPreset(presetId, settings) {
  const preset = studentNavigationPresets.find((item) => item.id === presetId);

  if (!preset || preset.id === "custom") {
    return null;
  }

  return preset.tabs
    .filter((tabId) => tabId !== "make" || settings.interfaceLevel !== "simple")
    .map((tabId) => studentTabDefinitions[tabId])
    .filter(Boolean);
}

export function resolveStudentTabs(displaySettings) {
  const settings = {
    ...defaultDisplaySettings,
    ...(displaySettings ?? {}),
  };

  if (settings.studentModeLayout === "boardOnly") {
    return [{ id: "board", label: "Talk" }];
  }

  if (settings.studentModeLayout === "firstThenOnly") {
    return [{ id: "schedule", label: "First / Then" }];
  }

  const presetTabs = buildTabsFromPreset(settings.studentNavigationPreset, settings);

  if (presetTabs) {
    return presetTabs;
  }

  if (settings.interfaceLevel === "simple") {
    return [
      settings.showScheduleTab !== false ? studentTabDefinitions.schedule : null,
      settings.showChoiceBoardTab !== false ? studentTabDefinitions.board : null,
      settings.showHelpTab !== false ? studentTabDefinitions.help : null,
      settings.showRelaxTab !== false ? studentTabDefinitions.relax : null,
    ].filter(Boolean);
  }

  return [
    settings.showProfileTab !== false ? studentTabDefinitions.profile : null,
    settings.showScheduleTab !== false ? studentTabDefinitions.schedule : null,
    settings.showChooseTab !== false ? studentTabDefinitions.choose : null,
    settings.showMakeTab !== false && settings.interfaceLevel !== "simple" ? studentTabDefinitions.make : null,
    settings.showChoiceBoardTab !== false ? studentTabDefinitions.board : null,
    settings.showHelpTab !== false ? studentTabDefinitions.help : null,
    settings.showRelaxTab !== false ? studentTabDefinitions.relax : null,
    settings.showGamesTab !== false ? studentTabDefinitions.games : null,
  ].filter(Boolean);
}

export function resolveInitialStudentTab(displaySettings) {
  const settings = {
    ...defaultDisplaySettings,
    ...(displaySettings ?? {}),
  };

  if (settings.studentModeLayout === "boardOnly") {
    return "board";
  }

  if (settings.studentModeLayout === "firstThenOnly") {
    return "schedule";
  }

  if (settings.defaultStudentView === "today") {
    return "schedule";
  }

  return settings.defaultStudentView || "schedule";
}

export function shouldShowText(displaySettings) {
  const settings = {
    ...defaultDisplaySettings,
    ...(displaySettings ?? {}),
  };

  return settings.textDisplay !== "iconsOnly" && settings.showWords !== false;
}

export function shouldShowVisuals(displaySettings) {
  const settings = {
    ...defaultDisplaySettings,
    ...(displaySettings ?? {}),
  };

  return settings.textDisplay !== "wordsOnly";
}
