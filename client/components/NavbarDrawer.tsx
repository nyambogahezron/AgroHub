import {Box, Drawer , Button, Divider, MenuItem, PaletteMode } from '@mui/material';
import { HomeNavData } from '../Data';
import ScrollToSection from './ScrollToSection';
import AuthButtons from './AuthButtons';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import { useState } from 'react';

interface NavDrawerProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export default function NavDrawer({ mode, toggleColorMode }: NavDrawerProps) {
  const [open, setOpen] = useState(false);

  // toggle sidebar
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <Box sx={{ display: { sm: '', md: 'none' } }}>
      {/* toggle drawer btn  */}
      <Button
        variant='text'
        color='primary'
        aria-label='menu'
        onClick={toggleDrawer(true)}
        sx={{ minWidth: '30px', p: '4px' }}
      >
        <MenuIcon />
      </Button>

      <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            minWidth: '60dvw',
            p: 2,
            backgroundColor: 'background.paper',
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
              flexGrow: 1,
            }}
          >
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          </Box>
          {HomeNavData.map((item) => {
            return (
              <MenuItem
                key={item.id}
                onClick={() =>
                  ScrollToSection({
                    sectionId: `${item.name}`,
                    setOpen: setOpen,
                  })
                }
              >
                {item.name}
              </MenuItem>
            );
          })}

          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <AuthButtons />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
