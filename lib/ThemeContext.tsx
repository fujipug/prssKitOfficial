'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";

const ThemeContext = createContext<{
  theme: string;
  setTheme: (theme: string) => void;
}>({
  theme: '',
  setTheme: () => { },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, changeTheme] = useState<string>('');

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    changeTheme(storedTheme || '');
  }, []);

  const setTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    changeTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
