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
import ToggleColorMode from '../ToggleColorMode';
import { HomeNavData } from '../../data';
import ScrollToSection from './ScrollToSection';
import NavbarDrawer from './NavbarDrawer';
import Link from 'next/link';
import { useGlobalContext } from '@/context/GlobalProvider';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function Navbar() {
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
          className='flex items-center justify-between rounded-full h-20 border'
          variant='regular'
          sx={(theme) => ({
            flexShrink: 0,
            bgcolor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            borderColor: 'divider',
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
                    <Box
                      sx={(theme) => ({
                        fontWeight: 'bold',
                        color:
                          theme.palette.mode === 'light' ? 'black' : 'white',
                      })}
                    >
                      {session?.name.charAt(0).toUpperCase()}
                    </Box>
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
            <ToggleColorMode />
          </Box>

          {/* mobile menu / drawer  */}
          <NavbarDrawer />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
