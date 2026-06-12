/**
 * Reusable local countdown timer button for activities, steps, and break plans.
 *
 * v15.2 adds `startSignal`, which lets another component start/restart the timer.
 * The timer button can still be tapped directly to pause/resume.
 *
 * Comment added in v15 to make the prototype easier to study and modify.
 */
import { useEffect, useMemo, useRef, useState } from "react";

function formatSeconds(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remaining = safeSeconds % 60;
  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

export default function TimerButton({ minutes, label = "Timer", startSignal = 0 }) {
  const totalSeconds = useMemo(() => Math.max(0, Number(minutes || 0) * 60), [minutes]);
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const previousStartSignalRef = useRef(startSignal);

  useEffect(() => {
    setRemainingSeconds(totalSeconds);
    setIsRunning(false);
  }, [totalSeconds]);

  useEffect(() => {
    if (previousStartSignalRef.current === startSignal) {
      return;
    }

    previousStartSignalRef.current = startSignal;

    if (!totalSeconds) {
      return;
    }

    setRemainingSeconds(totalSeconds);
    setIsRunning(true);
  }, [startSignal, totalSeconds]);

  useEffect(() => {
    if (!isRunning || remainingSeconds <= 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setRemainingSeconds((current) => {
        const next = Math.max(0, current - 1);

        if (next === 0) {
          setIsRunning(false);
        }

        return next;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isRunning, remainingSeconds]);

  if (!totalSeconds) {
    return null;
  }

  return (
    <button
      type="button"
      className={`timer-button ${isRunning ? "is-running" : ""}`}
      onClick={() => {
        if (remainingSeconds === 0) {
          setRemainingSeconds(totalSeconds);
          setIsRunning(true);
          return;
        }

        setIsRunning((current) => !current);
      }}
      aria-label={`${label} timer ${formatSeconds(remainingSeconds)}. ${isRunning ? "Pause" : "Start"}`}
    >
      <span aria-hidden="true">⏱️</span>
      <span>{formatSeconds(remainingSeconds)}</span>
    </button>
  );
}
