import { useEffect, useState } from "react";

export function useLocalStorage(key, fallbackValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallbackValue;
    } catch {
      return fallbackValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // In private browsing or restricted environments, localStorage may fail.
      // The app still works for the active session.
    }
  }, [key, value]);

  return [value, setValue];
}
