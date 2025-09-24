"use client";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

type Theme = "math" | "physics" | "chemistry" | "biology" | "cs";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("math");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("smartlearn-theme");
    if (saved && ["math", "physics", "chemistry", "biology", "cs"].includes(saved)) {
      setTheme(saved as Theme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("smartlearn-theme", theme);

    const html = document.documentElement;
    const themeClasses = ["math", "physics", "chemistry", "biology", "cs"];
    themeClasses.forEach(cls => html.classList.remove(cls));
    html.classList.add(theme);
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
