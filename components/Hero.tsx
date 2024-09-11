import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      id='hero'
      sx={(theme) => ({
        width: '100%',
        backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : `#090E10`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: { lg: 'row', xs: 'column' },
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          marginTop: { xs: -0, lg: -15 },
        }}
        className='flex gap-5 items-center justify-center'
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ width: { xs: '100%', sm: '70%' }, alignItems: 'center' }}
        >
          <Typography
            variant='h1'
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            AgroHub
          </Typography>
          <Typography
            textAlign='center'
            color='text.secondary'
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Explore our cutting-edge dashboard, delivering high-quality
            solutions tailored to your needs. Elevate your experience with
            top-tier features and services.
          </Typography>
        </Stack>
        <Box
          id='image'
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url("https://assets.justinmind.com/wp-content/uploads/2020/02/dahsboard-design-best-practices-example.png")'
                : 'url("https://assets.justinmind.com/wp-content/uploads/2020/02/dahsboard-design-best-practices-example.png")',
            backgroundSize: 'contain',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : ``,
          })}
        />
      </Container>
    </Box>
  );
}
