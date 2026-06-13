/**
 * Transition and waiting support defaults.
 */
export const defaultTransitionSettings = {
  showTransitionPanel: true,
  defaultCountdownMinutes: 2,
  almostDonePhrase: "Almost done.",
  nextPhrase: "Next is",
  waitPhrase: "Wait.",
  tryAgainPhrase: "Try again.",
  returnFromBreakPhrase: "Break is done. Return to schedule.",
  showReturnFromBreak: true,
  showTryAgain: true,
  showWaitCard: true,
};

export function getTransitionSettings(profile) {
  return {
    ...defaultTransitionSettings,
    ...(profile?.transitionSettings ?? {}),
  };
}
