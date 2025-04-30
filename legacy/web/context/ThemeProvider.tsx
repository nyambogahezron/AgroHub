'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeProviderProps = {
  theme: 'light' | 'dark';
  toggleTheme: (theme: string) => void;
  getTheme: () => void;
};

const ThemeContext = createContext<ThemeProviderProps>({
  theme: 'light',
  toggleTheme: () => {},
  getTheme: () => {},
});

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  async function getTheme() {
    const theme = await localStorage.getItem('theme') as 'light' | 'dark';

    if (theme) {
      setTheme(theme);
    } else {
      setTheme('light');
    }
  }

  async function toggleTheme(theme) {
    await localStorage.setItem('theme', theme);
    getTheme(); // reload the theme
  }

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
