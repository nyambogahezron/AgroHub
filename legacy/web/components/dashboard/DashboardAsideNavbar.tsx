'use client';
import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import SegmentIcon from '@mui/icons-material/Segment';
import Link from 'next/link';
import { useGlobalContext } from '@/context/GlobalProvider';
import { usePathname } from 'next/navigation';
import { DashboardMenuItem } from '@/data';
import { useRouter } from 'next/navigation';

const drawerWidth = 78;
const expandedDrawerWidth = 250;

export default function DashboardAsideNavbar() {
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);
  const { session, deleteSession } = useGlobalContext();
  const router = useRouter();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleOnLogout = () => {
    deleteSession();
    // Redirect to home
    router.replace('/');
  };

  return (
    <Drawer
      className='h-screen relative'
      variant='permanent'
      sx={{
        width: open ? expandedDrawerWidth : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? expandedDrawerWidth : drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.5s',
          background: '#11101D',
          overflow: 'hidden',
        },
      }}
    >
      <Toolbar className='flex flex-row justify-between'>
        {!open && (
          <IconButton
            className='-mr-6'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{ color: '#fff' }} />
          </IconButton>
        )}
        {open && (
          <>
            <Typography color='white' variant='h6' noWrap>
              AgroHub
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: -3 }}
              onClick={handleDrawerToggle}
            >
              <SegmentIcon sx={{ color: '#fff' }} />
            </IconButton>
          </>
        )}
      </Toolbar>
      {/* drawer menu */}
      <Box sx={{ overflow: 'hidden' }}>
        <List>
          <Divider className='' />
          {DashboardMenuItem.map((item, index) => (
            <Link href={item.link} key={index}>
              <Tooltip
                title={item.text}
                placement='right'
                key={index}
                disableHoverListener={open}
                sx={{
                  '&:hover': {
                    backgroundColor: '#1d1b31',
                    color: '#11101d',
                    cursor: 'pointer',
                  },
                  backgroundColor: currentPath === item.link ? '#1d1b31' : '',
                }}
              >
                <ListItem>
                  <ListItemIcon
                    sx={{
                      color: currentPath === item.link ? '#2b55b5' : '#fff',
                      '&:hover': {
                        color: '#2b55b5',
                      },
                    }}
                  >
                    <Icon component={item.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      color: '#fff',
                      opacity: open ? 1 : 0,
                      transition: 'opacity 0.5s',
                    }}
                  />
                </ListItem>
              </Tooltip>
            </Link>
          ))}
          <Divider />
        </List>
      </Box>

      <ListItem
        className={`flex absolute bottom-3 transition-all ${
          open ? '' : 'flex-col items-start gap-4 '
        }`}
      >
        <Link
          href='/dashboard/account'
          className='flex justify-between w-full items-center'
        >
          {session ? (
            session.avatar ? (
              <ListItemIcon>
                <Avatar alt={session.name} src={session.avatar} />
              </ListItemIcon>
            ) : (
              <Box className='flex items-center justify-center h-10 w-10 rounded-full border-2 border-gray-200 mr-2'>
                <Box
                  sx={(theme) => ({
                    fontWeight: 'bold',
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  })}
                >
                  {session?.name.charAt(0).toUpperCase()}
                </Box>
              </Box>
            )
          ) : (
            ''
          )}
          {open && (
            <ListItemText
              primary={
                session?.name.length > 30
                  ? session?.name.slice(0, 30) + '...'
                  : session?.name
              }
              color='white'
              sx={{
                color: '#fff',
                opacity: open ? 1 : 0,
                transition: 'opacity 0.5s',
              }}
            />
          )}
        </Link>
        <IconButton
          onClick={() => handleOnLogout()}
          edge='end'
          color='inherit'
          sx={{
            color: '#fff',
          }}
        >
          <ExitToAppIcon />
        </IconButton>
      </ListItem>
    </Drawer>
  );
}
