'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useGlobalContext } from '@/context/GlobalProvider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';
import CreateOrganizationModel from '../CreateOrganizationModel';
import Link from 'next/link';
import OrganizationDialog from './OrganizationDialog';

export default function DashboardTopNavbar() {
  const { session, organization, currentOrganization } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setDialogOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 0 new notifications'
          color='inherit'
        >
          <Badge badgeContent={0} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar sx={{ background: '#11101D' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* notification  badge */}
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'
            >
              <Badge badgeContent={0} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box className='flex flex-row items-center w-full px-3 ml-2'>
              <Link href='/dashboard/account'>
                <Box className='flex items-center justify-center h-8 w-8 rounded-lg border-2 border-gray-200 mr-2'>
                  <Box
                    sx={(theme) => ({
                      fontWeight: 'bold',
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    })}
                  >
                    {session?.name?.charAt(0).toUpperCase()}
                  </Box>
                </Box>
              </Link>
              <Box className='p-1 rounded-lg flex flex-row justify-between items-center'>
                <Button
                  onClick={handleDialogOpen}
                  color='inherit'
                  sx={{ fontSize: 15 }}
                >
                  {currentOrganization?.name?.length > 10
                    ? currentOrganization?.name?.slice(0, 10) + '...'
                    : currentOrganization?.name}
                  <ArrowForwardIosIcon sx={{ fontSize: 15, marginLeft: 1 }} />
                </Button>
              </Box>

              {!organization?.length && (
                <Box className='p-1 rounded-lg flex flex-row justify-between items-center'>
                  <Button
                    color='primary'
                    onClick={handleOpen}
                    sx={{ fontSize: 15 }}
                    className='text-white capitalize bg-blue-500'
                  >
                    Create Organization
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

      {/* create organization model */}
      <CreateOrganizationModel open={open} handleClose={handleClose} />

      {/* set default organization dialog */}
      <OrganizationDialog
        openCreateOrgModal={handleOpen}
        open={openDialog}
        onClose={handleDialogClose}
      />
    </Box>
  );
}
