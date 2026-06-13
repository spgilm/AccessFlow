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
  showChooseTab: true,
  showMakeTab: true,
  showChoiceBoardTab: true,
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
  defaultStudentView: "today",
};

export function getDisplaySettings(profile) {
  return {
    ...defaultDisplaySettings,
    ...(profile?.displaySettings ?? {}),
  };
}

export function resolveStudentTabs(displaySettings) {
  const settings = {
    ...defaultDisplaySettings,
    ...(displaySettings ?? {}),
  };

  if (settings.studentModeLayout === "boardOnly") {
    return [{ id: "board", label: "Board" }];
  }

  if (settings.studentModeLayout === "firstThenOnly") {
    return [{ id: "today", label: "First / Then" }];
  }

  if (settings.interfaceLevel === "simple") {
    return [
      { id: "today", label: "Today" },
      settings.showChoiceBoardTab !== false ? { id: "board", label: "Board" } : null,
    ].filter(Boolean);
  }

  return [
    { id: "today", label: "Today" },
    settings.showChooseTab !== false ? { id: "choose", label: "Choose" } : null,
    settings.showMakeTab !== false && settings.interfaceLevel !== "simple" ? { id: "make", label: "Make" } : null,
    settings.showChoiceBoardTab !== false ? { id: "board", label: "Board" } : null,
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
    return "today";
  }

  return settings.defaultStudentView || "today";
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
