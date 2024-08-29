import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ToggleColorMode from './ToggleColorMode';
import { HomeNavData } from '../Data/AppData';
import AuthButtons from './AuthButtons';
import ScrollToSection from './ScrollToSection';
import NavbarDrawer from './NavbarDrawer';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

interface HomeNavbarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

function HomeNavbar({ mode, toggleColorMode }: HomeNavbarProps) {
  return (
    <div>
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

              <AuthButtons />
            </Box>

            {/* mobile menu / drawer  */}
            <NavbarDrawer mode={mode} toggleColorMode={toggleColorMode} />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default HomeNavbar;
