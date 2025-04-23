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
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalProvider';
import { updateTransaction } from '@/query/api';
import { toast } from 'react-toastify';
import { event, Transaction } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function UpdateTransaction() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTransactionData, setCurrentTransactionData] =
    useState<Transaction>({
      _id: '',
      organization: '',
      budget: '',
      title: '',
      amount: 0,
      category: '',
      description: '',
      transaction_date: '',
      receipt: '',
    });
  const { transactions, setTransactions, organization, budgetData } =
    useGlobalContext();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const transactionData = transactions.find(
        (transaction) => transaction._id === id
      );
      if (transactionData) {
        setCurrentTransactionData(transactionData);
        setIsLoaded(false);
      }
    }
  }, [id, transactions]);

  const [formData, setFormData] = useState({
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
    if (currentTransactionData._id) {
      setFormData({
        organization: currentTransactionData.organization,
        budget: currentTransactionData.budget,
        title: currentTransactionData.title,
        amount: currentTransactionData.amount,
        category: currentTransactionData.category,
        description: currentTransactionData.description,
        transaction_date: currentTransactionData.transaction_date,
        receipt: currentTransactionData.receipt,
      });
    }
  }, [currentTransactionData]);

  const handleInputChange = (e: event) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const res = await updateTransaction(formData, id.toString());

    if (res) {
      toast.success('Transaction updated successfully');
      const currentTransactions = transactions.filter(
        (transaction) => transaction?._id !== id
      );
      setTransactions([...currentTransactions, res.transaction]);

      router.push('/dashboard/transactions');
    }
  };

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
            Update Transaction
          </Typography>
          <Button autoFocus color='inherit' onClick={handleSubmit}>
            Update
          </Button>
        </Toolbar>
      </AppBar>
      <List sx={{ mt: 5, px: 2 }}>
        <Grid container spacing={2} sx={{ marginY: 2, paddingX: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id='organization-label'>Organization</InputLabel>
              <Select
                labelId='organization-label'
                value={formData.organization}
                onChange={(e) =>
                  setFormData({ ...formData, organization: e.target.value })
                }
                label='Organization'
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
            <FormControl fullWidth>
              <InputLabel id='organization-label'>Budget</InputLabel>
              <Select
                labelId='budget-label'
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                label='Budget'
              >
                {budgetData &&
                  budgetData?.map((item, index: number) => (
                    <MenuItem key={index} value={item?._id}>
                      {item?.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Title'
              name='title'
              fullWidth
              value={formData.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Amount'
              name='amount'
              fullWidth
              value={formData.amount}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id='organization-label'>Category</InputLabel>
              <Select
                labelId='category-label'
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                label='Category'
              >
                {['sales', 'expense'].map((item, index: number) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Description'
              name='description'
              fullWidth
              value={formData.description}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Receipt'
              name='receipt'
              fullWidth
              value={formData.receipt}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Divider />
      </List>
    </Stack>
  );
}
