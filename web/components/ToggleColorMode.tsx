'use client';

import { Box, Button } from '@mui/material';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import { useTheme } from '@/context/ThemeProvider';
import { useState } from 'react';

function ToggleColorMode() {
  const [mode, setMode] = useState('dark');
  const { theme, getTheme, toggleTheme } = useTheme();

  const handleThemeChange = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    toggleTheme(mode);
    getTheme();
  };
  return (
    <Box sx={{ maxWidth: '32px' }} className='ml-2'>
      <Button
        variant='text'
        onClick={handleThemeChange}
        size='small'
        aria-label='button to toggle theme'
        sx={{ minWidth: '32px', height: '32px', p: '4px' }}
      >
        {theme === 'dark' ? (
          <WbSunnyRoundedIcon fontSize='small' />
        ) : (
          <ModeNightRoundedIcon fontSize='small' />
        )}
      </Button>
    </Box>
  );
}

export default ToggleColorMode;
