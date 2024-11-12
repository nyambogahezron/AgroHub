'use client';

import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Transaction } from '@/types';
import { useParams, useRouter } from 'next/navigation';

export default function ViewTransaction() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTransactionData, setCurrentTransactionData] =
    useState<Transaction>({
      _id: '',
      user: '',
      organization: '',
      budget: '',
      title: '',
      amount: 0,
      category: '',
      description: '',
      transaction_date: '',
      receipt: '',
    });
  const { transactions,organization,budgetData } = useGlobalContext();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const transaction = transactions.find(
      (transaction) => transaction._id === id
    );
    if (transaction) {
      setCurrentTransactionData(transaction);
      setIsLoaded(true);
    }
  }, [id, transactions]);

  const [formData, setFormData] = useState({
    user: '',
    organization: '',
    budget: '',
    title: '',
    amount: 0,
    category: '',
    description: '',
    transaction_date: '',
    receipt: '',
  });

  useEffect(() => {
    const orgName = organization.find((org) => org._id === currentTransactionData.organization);
    const budgetName = budgetData.find((budget) => budget._id === currentTransactionData.budget);  
    if (currentTransactionData._id) {
      setFormData({
        user: currentTransactionData.user,
        organization: orgName?.name || '',
        budget: budgetName?.title || '',
        title: currentTransactionData.title,
        amount: currentTransactionData.amount,
        category: currentTransactionData.category,
        description: currentTransactionData.description,
        transaction_date: currentTransactionData.transaction_date,
        receipt: currentTransactionData.receipt,
      });
    }
  }, [currentTransactionData]);

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
            Transaction Info
          </Typography>
        </Toolbar>
      </AppBar>
      <List sx={{ mt: 5, px: 2 }}>
        <Grid container spacing={2} sx={{ marginY: 2, paddingX: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='User'
              name='user'
              fullWidth
              value={formData.user}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Organization'
              name='organization'
              fullWidth
              value={formData.organization}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Budget'
              name='budget'
              fullWidth
              value={formData.budget}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Title'
              name='title'
              fullWidth
              value={formData.title}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Amount'
              name='amount'
              fullWidth
              value={formData.amount}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Category'
              name='category'
              fullWidth
              value={formData.category}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Description'
              name='description'
              fullWidth
              value={formData.description}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Transaction Date'
              name='transaction_date'
              type='date'
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.transaction_date}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Receipt'
              name='receipt'
              fullWidth
              value={formData.receipt}
              InputProps={{ readOnly: true }}
            />
          </Grid> */}
        </Grid>
        <Divider />
      </List>
    </Stack>
  );
}
