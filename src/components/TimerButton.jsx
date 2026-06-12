import { useEffect, useMemo, useState } from "react";

function formatSeconds(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remaining = safeSeconds % 60;
  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

export default function TimerButton({ minutes, label = "Timer" }) {
  const totalSeconds = useMemo(() => Math.max(0, Number(minutes || 0) * 60), [minutes]);
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setRemainingSeconds(totalSeconds);
    setIsRunning(false);
  }, [totalSeconds]);

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
