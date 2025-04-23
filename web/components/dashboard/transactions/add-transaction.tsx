import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
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
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalProvider';
import { createTransaction } from '@/query/api';
import { toast } from 'react-toastify';
import PreLoading from '@/components/Loading';
import { event } from '@/types';

export default function AddTransaction({ open, handleModelClose }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { transactions, setTransactions, organization, budgetData } =
    useGlobalContext();
  const nowDate = new Date();

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    transaction_date: `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(nowDate.getDate()).padStart(2, '0')}`,
    organization: '',
    budget: '',
    receipt: '',
  });

  const handleInputChange = (e: event) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const res = await createTransaction(formData);

    if (res && res.transaction) {
      toast.success('Transaction created successfully');
      setTransactions([...transactions, res.transaction]);
      
      // clear form data
      setFormData({
        title: '',
        amount: '',
        category: '',
        description: '',
        transaction_date: `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(
          2,
          '0'
      )}-${String(nowDate.getDate()).padStart(2, '0')}`,
      organization: '',
      budget: '',
      receipt: '',
    });
    handleModelClose();
  }
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
            Add Transaction
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
              type='number'
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
    </Dialog>
  );
}
