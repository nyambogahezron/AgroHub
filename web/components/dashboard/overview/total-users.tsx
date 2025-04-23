'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { useGlobalContext } from '@/context/GlobalProvider';

export function TotalUsers() {
  const {users}= useGlobalContext();
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction='row'
            sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color='text.secondary' variant='overline'>
                Total Users
              </Typography>
              <Typography variant='h4'>{users?.length | 0}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: 'var(--mui-palette-success-main)',
                height: '56px',
                width: '56px',
              }}
            >
              <PersonIcon sx={{ color: 'white' }} />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
