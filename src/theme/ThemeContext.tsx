/* FIRST — theme context.
 * Selects the Paper or Cinema world. Components read `useTheme().colors`
 * instead of reaching for raw scales, so the same primitive renders correctly
 * in both worlds (mirrors the CSS `.cinema` scope flip).
 */
import React, { createContext, useContext, useMemo } from 'react';
import { themes, type ThemeColors, type ThemeMode } from './themes';

interface ThemeValue {
  mode: ThemeMode;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeValue>({
  mode: 'paper',
  colors: themes.paper,
});

export function ThemeProvider({
  mode,
  children,
}: {
  mode: ThemeMode;
  children: React.ReactNode;
}) {
  const value = useMemo<ThemeValue>(() => ({ mode, colors: themes[mode] }), [mode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  return useContext(ThemeContext);
}
