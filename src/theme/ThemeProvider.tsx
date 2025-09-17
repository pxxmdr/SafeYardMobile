import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DARK_PALETTE, LIGHT_PALETTE, Theme, ThemeMode } from "./palette";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void; 
  setThemeMode: (m: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const STORAGE_KEY = "@safeyard:themeMode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme: ColorSchemeName = Appearance.getColorScheme();
  const systemDefault: ThemeMode = systemScheme === "dark" ? "dark" : "light";

  const [mode, setMode] = useState<ThemeMode>(systemDefault);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") setMode(saved);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      
    });
    return () => sub.remove();
  }, []);

  const setThemeMode = async (m: ThemeMode) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, m);
    } catch {}
    setMode(m);
  };

  const toggleTheme = () => setThemeMode(mode === "dark" ? "light" : "dark");

  const theme: Theme = useMemo(
    () => ({
      mode,
      colors: mode === "dark" ? DARK_PALETTE : LIGHT_PALETTE,
    }),
    [mode]
  );

  const value = useMemo<ThemeContextType>(
    () => ({ theme, toggleTheme, setThemeMode }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
