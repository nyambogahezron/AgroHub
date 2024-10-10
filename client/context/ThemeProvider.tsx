import { createContext, useContext, useEffect, useState } from 'react';

type ThemeProviderProps = {
    theme: string;
    setTheme: (theme: string) => void;
    toggleTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeProviderProps>({
    theme: 'light',
    setTheme: () => {},
    toggleTheme: () => {},
});

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  async function getTheme() {
    const theme = await localStorage.getItem('theme');

    if (theme) {
      setTheme(JSON.parse(theme));
    } else {
      setTheme('light');
    }
  }

  async function toggleTheme(theme) {
    await localStorage.setItem('theme', JSON.stringify(theme));
    getTheme(); // reload the theme
  }

  useEffect(() => {
    getTheme();

    console.log('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
