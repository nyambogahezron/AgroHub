import { Box, Typography } from '@mui/material';
import React from 'react'

export default function AuthHeader({ title }: { title: string }) {
  return (
    <Box>
      <Typography
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
