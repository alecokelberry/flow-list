import { useState, useEffect } from "react";

type Theme = 'light' | 'dark';

/**
 * Custom hook to manage the application theme (light/dark).
 * Persists preference to localStorage and respects system preference.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    try {
      const stored = localStorage.getItem("flowlist-theme");
      if (stored === "light" || stored === "dark") {
        return stored;
      }
    } catch (e) {
      console.warn("Failed to access localStorage for theme:", e);
    }

    // Fallback to system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    try {
      localStorage.setItem("flowlist-theme", theme);
    } catch (e) {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}
