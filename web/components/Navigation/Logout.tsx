import React from 'react';
import { IconButton } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

export default function Logout() {
  const handleOnLogout = () => {
    // deleteSession();

    // Redirect to home
    window.location.href = '/';
  };

  return (
    <IconButton
      onClick={() => handleOnLogout()}
      edge='end'
      color='inherit'
      sx={{
        color: '#fff',
      }}
    >
      <ExitToApp />
    </IconButton>
  );
}
