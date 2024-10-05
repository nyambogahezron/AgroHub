import { Box, Typography } from '@mui/material';
import React from 'react';
type AuthHeaderProps = {
  title: string;
  customTitleStyles?: string;
};

export default function AuthHeader({
  title,
  customTitleStyles,
}: AuthHeaderProps) {
  return (
    <Box>
      <Typography
        className={customTitleStyles}
        variant='h2'
        sx={{
          display: 'flex',
          width: '100%',
          marginTop: { xs: 8, md: 0 },
          alignSelf: 'start',
          textAlign: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(2rem, 10vw, 2.5rem)',
          fontWeight: 'bold',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
