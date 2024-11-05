'use client';

import React from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  List,
  ListItem,
  Divider,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalProvider';
import PreLoading from '@/components/Loading';

export default function ViewBudget({ open, handleModelClose, budget }) {
  const { organization: org } = useGlobalContext();
  const nowDate = new Date();

  const formData = {
    organization: budget.organization,
    title: budget.title,
    date:
      budget.date ||
      `${nowDate.getMonth()}/${nowDate.getDate()}/${nowDate.getFullYear()}`,
    items: budget.items || [{ name: '', amount: '' }],
  };

  const total = formData.items.reduce(
    (acc, item) => acc + parseInt(item.amount),
    0
  );

  return (
    <Stack>
      <AppBar sx={{ position: 'fixed', marginBottom: 3 }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => {}}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            View Budget
          </Typography>
          <Typography sx={{ mr: 2 }} variant='h6' component='div'>
            Total: {total || 0}
          </Typography>
        </Toolbar>
      </AppBar>
      <List sx={{ mt: 5, px: 2 }}>
        <Grid container spacing={2} sx={{ marginY: 2, paddingX: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant='subtitle1'>Organization</Typography>
            <Typography variant='body1'>
              {org.find((o) => o._id === formData.organization)?.name || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant='subtitle1'>Title</Typography>
            <Typography variant='body1'>{formData.title}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant='subtitle1'>Date</Typography>
            <Typography variant='body1'>{formData.date}</Typography>
          </Grid>
        </Grid>
        <Divider />
        {formData.items.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={6}>
                  <Typography variant='subtitle1'>Item Name</Typography>
                  <Typography variant='body1'>{item.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='subtitle1'>Amount</Typography>
                  <Typography variant='body1'>{item.amount}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
