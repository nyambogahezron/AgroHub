'use client';
import React, { useState } from 'react';
import {
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Box,
  Drawer,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Chat as ChatIcon,
  PieChart as PieChartIcon,
  ShoppingCart as ShoppingCartIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import SegmentIcon from '@mui/icons-material/Segment';
import Link from 'next/link';
import { useGlobalContext } from '@/context/GlobalProvider';
const drawerWidth = 78;
const expandedDrawerWidth = 250;

export default function DashboardAsideNavbar() {
  const [open, setOpen] = useState(false);
  const { session } = useGlobalContext();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const DashboardMenuItem = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
    { text: 'Analytics', icon: <PieChartIcon />, link: '/dashboard/analytics' },
    { text: 'Market', icon: <ShoppingCartIcon />, link: '/dashboard/market' },
    { text: 'User', icon: <PersonIcon />, link: '/dashboard/users' },
    {
      text: 'Notifications',
      icon: <ChatIcon />,
      link: '/dashboard/notifications',
    },
    { text: 'Settings', icon: <SettingsIcon />, link: '/dashboard/settings' },
  ];

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
                }}
              >
                <ListItem>
                  <ListItemIcon
                    sx={{
                      color: '#fff',
                      '&:hover': {
                        color: 'blue',
                      },
                    }}
                  >
                    {item.icon}
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
