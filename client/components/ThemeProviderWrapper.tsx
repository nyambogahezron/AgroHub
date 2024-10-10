'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from '@/context/ThemeProvider';
import getLPTheme from './Theme';

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const LPtheme = createTheme(getLPTheme(theme));

  return <ThemeProvider theme={LPtheme}>{children}</ThemeProvider>;
}
s