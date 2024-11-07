import React, { useState } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalProvider';
import { createUser } from '@/query/api';
import { toast } from 'react-toastify';
import PreLoading from '@/components/Loading';
import { useRouter } from 'next/navigation';

export default function AddUser({ open, handleModelClose }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { setUserData, userData } = useGlobalContext();
  const nowDate = new Date();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    phone: '',
    date: `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(nowDate.getDate()).padStart(2, '0')}`,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const res = await createUser(formData);

    if (res) {
      toast.success('User created successfully');
      setUserData([...userData, res.user]);
    }

    // clear form data
    setFormData({
      name: '',
      email: '',
      location: '',
      phone: '',
      date: `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(nowDate.getDate()).padStart(2, '0')}`,
    });
    handleModelClose();
  };

  return (
    <Dialog fullScreen open={open} onClose={handleModelClose}>
      {isLoaded && <PreLoading />}
      <AppBar sx={{ position: 'fixed', marginBottom: 3 }}>
        {/* header */}
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleModelClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Add User
          </Typography>
          <Button autoFocus color='inherit' onClick={handleSubmit}>
            Save
          </Button>
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
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Email'
              name='email'
              fullWidth
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Location'
              name='location'
              fullWidth
              value={formData.location}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Phone'
              name='phone'
              fullWidth
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Date'
              name='date'
              type='date'
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Divider />
      </List>
    </Dialog>
  );
}
