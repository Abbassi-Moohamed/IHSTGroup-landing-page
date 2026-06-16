"use client";

import { useEffect, useState } from "react";
import type { ThemeMode } from "@/types";

const STORAGE_KEY = "ihs-theme";

export function useTheme(defaultTheme: ThemeMode = "dark") {
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;

    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme };
}
