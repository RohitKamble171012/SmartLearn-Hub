"use client";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

type Theme = "light" | "dark" | "blue" | "purple" | "green" | "pink";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme in localStorage or default to light
    const saved = localStorage.getItem("smartlearn-theme");
    if (saved && ["light", "dark", "blue", "purple", "green", "pink"].includes(saved)) {
      setTheme(saved as Theme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem("smartlearn-theme", theme);
    
    // Apply theme class to html element
    const html = document.documentElement;
    const themeClasses = ["light", "dark", "blue", "purple", "green", "pink"];
    
    // Remove all theme classes
    themeClasses.forEach(cls => html.classList.remove(cls));
    
    // Add current theme class
    html.classList.add(theme);
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

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