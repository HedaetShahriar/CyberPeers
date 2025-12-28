import { useCallback, useEffect, useMemo, useState } from "react";
import ThemeContext, { type Theme } from "./ThemeContext";

const STORAGE_KEY = "cyberpeers-theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === "light" || raw === "dark" || raw === "system") return raw;
  return "system";
}

function applyThemeToDom(resolvedTheme: "light" | "dark") {
  const root = document.documentElement;
  if (resolvedTheme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function withThemeTransition(run: () => void) {
  const root = document.documentElement;
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    run();
    return;
  }

  root.classList.add("theme-transition");
  run();

  // Remove after a short delay so the CSS variables have time to animate.
  window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, 220);
}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme());
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() =>
    getSystemTheme()
  );

  const resolvedTheme = useMemo<"light" | "dark">(
    () => (theme === "system" ? systemTheme : theme),
    [theme, systemTheme]
  );

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    if (next === "system") {
      setSystemTheme(getSystemTheme());
    }
  }, []);

  const toggleTheme = useCallback(() => {
    withThemeTransition(() => {
      const effective = theme === "system" ? systemTheme : theme;
      setTheme(effective === "dark" ? "light" : "dark");
    });
  }, [setTheme, systemTheme, theme]);

  useEffect(() => {
    applyThemeToDom(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemTheme(getSystemTheme());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, resolvedTheme }),
    [theme, setTheme, toggleTheme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
