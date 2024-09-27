import React from 'react';
import { Box } from '@mui/material';
import DashboardAsideNavbar from '../../components/DashboardAsideNavbar';
import DashboardTopNavbar from '../../components/DashboardTopNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardAsideNavbar />
      <Box component='main' sx={{ flexGrow: 1 }}>
        <DashboardTopNavbar />
        {children}
      </Box>
    </Box>
  );
}
