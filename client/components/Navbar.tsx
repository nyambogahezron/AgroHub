import * as React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import ToggleColorMode from './ToggleColorMode';
import { HomeNavData } from '../data';
import ScrollToSection from './ScrollToSection';
import NavbarDrawer from './NavbarDrawer';
import { HomeNavbarProps } from '../types';
import Link from 'next/link';
import { useGlobalContext } from '@/context/GlobalProvider';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function Navbar({ mode, toggleColorMode }: HomeNavbarProps) {
  const { session } = useGlobalContext();

  return (
    <AppBar
      position='fixed'
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar
          variant='regular'
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              ml: '-18px',
              px: 0,
            }}
          >
            {/* logo */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {HomeNavData.map((item) => {
                return (
                  <MenuItem
                    className='hover:bg-gray-200 hover:rounded-full'
                    key={item.id}
                    onClick={() =>
                      ScrollToSection({
                        sectionId: `${item.name}`,
                      })
                    }
                    sx={{
                      py: '6px',
                      px: '12px',
                      textTransform: 'capitalize',
                    }}
                  >
                    <Typography variant='body2' color='text.primary'>
                      {item.name}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Box>
          </Box>
          {/* theme color toggle btn  */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

            {session ? (
              <>
                <Link href='/dashboard'>
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{ textTransform: 'capitalize' }}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link href='/profile'>
                  <Box className='flex items-center justify-center h-10 w-10 rounded-full border-2 border-gray-200 ml-2'>
                    <span className='text-black font-bold'>
                      {session?.name.charAt(0).toUpperCase()}
                    </span>
                  </Box>
                </Link>
              </>
            ) : (
              <>
                <Link className='text-black' href='/login'>
                  <Button color='primary' variant='text' size='small'>
                    Sign In
                  </Button>
                </Link>
                <Link
                  className='text-white font-bold text-sm '
                  href='/register'
                >
                  <Button color='primary' variant='contained' size='small'>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Box>

          {/* mobile menu / drawer  */}
          <NavbarDrawer mode={mode} toggleColorMode={toggleColorMode} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
