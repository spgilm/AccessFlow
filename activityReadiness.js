/**
 * Student action helper functions.
 *
 * Keeps confirmation/audio behavior outside App.jsx while preserving per-profile
 * display settings behavior.
 */
import { speakText } from "./readAloudHelpers.js";

export function confirmMajorStudentAction(displaySettings, message) {
  if (!displaySettings?.confirmBeforeMajorActions) {
    return true;
  }

  return window.confirm(message);
}

export function playStudentAudioFeedback(displaySettings, message) {
  if (!displaySettings?.playAudioFeedback) {
    return;
  }

  speakText(message, 0.95);
}
