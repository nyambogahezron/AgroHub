'use client';

import { Box, Drawer, Button, Divider, MenuItem } from '@mui/material';
import { HomeNavData } from '../data';
import ScrollToSection from './ScrollToSection';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import { useState } from 'react';
import Link from 'next/link';

export default function NavDrawer() {
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
            <ToggleColorMode />
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
            <Button color='primary' variant='text' size='small'>
              <Link className='text-black' href='/login'>
                Sign In
              </Link>
            </Button>
            <Button color='primary' variant='contained' size='small'>
              <Link className='text-white font-bold text-sm ' href='/register'>
                Sign Up
              </Link>
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
