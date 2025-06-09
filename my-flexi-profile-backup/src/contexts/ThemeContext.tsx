
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type Accent = "blue" | "green" | "purple" | "orange";

interface ThemeContextType {
  theme: Theme;
  accent: Accent;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccent] = useState<Accent>("blue");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedAccent = localStorage.getItem("accent") as Accent;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
    
    if (savedAccent) {
      setAccent(savedAccent);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    
    root.classList.remove("blue", "purple", "green", "orange");
    root.classList.add(accent);
    
    localStorage.setItem("theme", theme);
    localStorage.setItem("accent", accent);
  }, [theme, accent]);

  const value = {
    theme,
    accent,
    setTheme,
    setAccent,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
