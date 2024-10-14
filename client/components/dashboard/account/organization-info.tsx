'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CreateOrganizationModel from '@/components/CreateOrganizationModel';
import { Box } from '@mui/material';

const user = {
  name: 'Sofia Farms',
  avatar: '/assets/avatar.png',
  jobTitle: 'Senior Developer',
  country: 'USA',
  city: 'Los Angeles',
  timezone: 'GTM-7',
} as const;

export default function OrganizationInfo() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Card className='w-full min-w-[600px] mb-10'>
      <CardContent>
        <Box className='flex flex-row border-6 p-4 border-blue-600'></Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant='text' onClick={() => handleOpen()}>
          Create Organization
        </Button>
      </CardActions>

      <CreateOrganizationModel open={open} handleClose={handleClose} />
    </Card>
  );
}
