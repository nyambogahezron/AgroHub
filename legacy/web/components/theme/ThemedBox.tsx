'use client';

import { Box } from '@mui/material';
import React from 'react';
type ThemedBox = {
  children: React.ReactNode;
  containerStyles?: string;
};

export default function ThemedBox({
  children,
  containerStyles,
}: ThemedBox): JSX.Element {
  return (
    <Box
      className={containerStyles}
      sx={(theme) => ({
        display: 'flex',
        backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : `#090E10`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      {children}
    </Box>
  );
}
