import React from 'react';
import { Box } from '@mui/material';
import DashboardAsideNavbar from '../../components/dashboard/DashboardAsideNavbar';
import DashboardTopNavbar from '../../components/dashboard/DashboardTopNavbar';
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';
import ThemedBox from '@/components/theme/ThemedBox';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProviderWrapper>
      <ThemedBox>
        <DashboardAsideNavbar />
        <Box component='main' sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <DashboardTopNavbar />
          <Box className='px-3 py-2'>{children}</Box>
        </Box>
      </ThemedBox>
    </ThemeProviderWrapper>
  );
}
