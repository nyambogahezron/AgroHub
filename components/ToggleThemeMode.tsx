import React from 'react';
import { PaletteMode } from '@mui/material';

export default function ToggleThemeMode() {
  const [mode, setMode] = React.useState<PaletteMode>('light');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };
  return mode;
}
