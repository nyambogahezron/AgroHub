'use client';
import React, { useState } from 'react';
import {
  AppBar,
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
  CssBaseline,
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
const drawerWidth = 78;
const expandedDrawerWidth = 250;

export default function DashboardAsideNavbar() {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const DashboardMenuItem = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Analytics', icon: <PieChartIcon /> },
    { text: 'Market', icon: <ShoppingCartIcon /> },
    { text: 'User', icon: <PersonIcon /> },
    { text: 'Notifications', icon: <ChatIcon /> },
    { text: 'Setting', icon: <SettingsIcon /> },
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
          {/* search btn */}
          <Tooltip title='Search' placement='right' disableHoverListener={open}>
            <ListItem>
              <ListItemIcon>
                <IconButton
                  className='bg-[#1d1b31] rounded-lg items-center justify-center hover:bg-white hover:text-black'
                  color='inherit'
                  aria-label='menu'
                  onClick={handleDrawerToggle}
                  sx={{ ml: -1 }}
                >
                  <SearchIcon
                    sx={{
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#FFF',
                        color: '#11101d',
                      },
                    }}
                  />
                </IconButton>
              </ListItemIcon>
              <InputBase
                placeholder='Search...'
                sx={{
                  color: '#FFF',
                  background: '#1d1b31',
                  borderRadius: '12px',
                  padding: open ? '0 24px 0 60px' : '0',
                  width: open ? '100%' : '50px',
                  transition: 'all 0.5s',
                }}
              />
            </ListItem>
          </Tooltip>
          {/* search btn end */}

          <Divider />
          {DashboardMenuItem.map((item, index) => (
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
          ))}
          <Divider />
        </List>
      </Box>

      <ListItem className='flex absolute bottom-3'>
        <ListItemIcon>
          <Avatar
            alt='John Doe'
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          />
        </ListItemIcon>
        <ListItemText
          primary='John Doe'
          color='white'
          sx={{
            color: '#fff',
            opacity: open ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />
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
