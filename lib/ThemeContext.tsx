'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";

const ThemeContext = createContext<{
  // isDark: boolean;
  setTheme: (theme: string) => void;
}>({
  // isDark: false,
  setTheme: () => { },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // const [isDark] = useState(localStorage.getItem("isDark") === "true");
  const [theme, changeTheme] = useState<string>();

  useEffect(() => {
    // localStorage.setItem("isDark", String(isDark));
    changeTheme(localStorage.getItem("theme") || "fantasy");
    document.documentElement.setAttribute("data-theme", theme || "fantasy");
  }, [theme]);

  const setTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    changeTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
