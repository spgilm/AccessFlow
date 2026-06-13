/**
 * useThemeEffect
 *
 * Applies the selected light/dark theme to the document root.
 */
import { useEffect } from "react";

export function useThemeEffect(theme) {
  useEffect(() => {
    const safeTheme = theme === "dark" ? "dark" : "light";

    document.documentElement.dataset.theme = safeTheme;
    document.documentElement.style.colorScheme = safeTheme;
  }, [theme]);
}
