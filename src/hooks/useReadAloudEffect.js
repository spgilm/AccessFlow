/**
 * useReadAloudEffect
 *
 * Enables click-to-read behavior when text-to-speech is enabled.
 */
import { useEffect } from "react";
import { getReadableText, speakText } from "../utils/readAloudHelpers.js";

export function useReadAloudEffect(textToSpeechEnabled) {
  useEffect(() => {
    if (!textToSpeechEnabled || typeof window === "undefined" || !window.speechSynthesis) {
      return undefined;
    }

    function handleReadClick(event) {
      const text = getReadableText(event.target);
      speakText(text, 0.9);
    }

    document.addEventListener("click", handleReadClick, true);

    return () => {
      document.removeEventListener("click", handleReadClick, true);
      window.speechSynthesis.cancel();
    };
  }, [textToSpeechEnabled]);
}
