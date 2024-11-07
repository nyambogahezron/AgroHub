'use client';

import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalProvider';
import { User } from '@/types';
import { useParams, useRouter } from 'next/navigation';

export default function ViewUser() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUserData, setCurrentUserData] = useState<User>({
    _id: '',
    name: '',
    email: '',
    location: '',
    phone: '',
    date: '',
    organization: '',
    role: 'member',
  });
  const { users, organization } = useGlobalContext();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const user = users.find((user) => user._id === id);
    if (user) {
      setCurrentUserData(user);
      setIsLoaded(true);
    }
  }, [id, users]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    phone: '',
    date: '',
    organization: '',
    role: 'member',
  });

  useEffect(() => {
    if (currentUserData._id) {
      setFormData({
        name: currentUserData.name,
        email: currentUserData.email,
        location: currentUserData.location,
        phone: currentUserData.phone,
        date: currentUserData.date,
        organization: currentUserData.organization,
        role: currentUserData.role,
      });
    }
  }, [currentUserData]);

  return (
    <Stack>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => router.back()}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            User Info
          </Typography>
        </Toolbar>
      </AppBar>
      <List sx={{ mt: 5, px: 2 }}>
        <Grid container spacing={2} sx={{ marginY: 2, paddingX: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Name'
              name='name'
              fullWidth
              value={formData.name}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Email'
              name='email'
              fullWidth
              value={formData.email}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Location'
              name='location'
              fullWidth
              value={formData.location}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Phone'
              name='phone'
              fullWidth
              value={formData.phone}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id='role-label'>Role</InputLabel>
              <Select
                labelId='role-label'
                value={formData.role}
                label='Role'
                inputProps={{ readOnly: true }}
              >
                {['admin', 'member'].map((item: string, index: number) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id='organization-label'>Organization</InputLabel>
              <Select
                labelId='organization-label'
                value={formData.organization}
                label='Organization'
                inputProps={{ readOnly: true }}
              >
                {organization.map((org) => (
                  <MenuItem key={org._id} value={org._id}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Date'
              name='date'
              type='date'
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
        <Divider />
      </List>
    </Stack>
  );
}
