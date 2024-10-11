'use client';

import { Box } from '@mui/material';
import React from 'react';

export default function ThemedBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
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
