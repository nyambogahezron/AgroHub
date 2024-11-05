import React, { useState, useEffect } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useGlobalContext } from '@/context/GlobalProvider';
import { updateBudget } from '@/query/api'; 
import { toast } from 'react-toastify';
import PreLoading from '@/components/Loading';

export default function UpdateBudget({ open, handleModelClose, budget }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { organization: org, currentOrganization } = useGlobalContext();
  const nowDate = new Date();

  const [formData, setFormData] = useState({
    organization: budget.organization || currentOrganization?._id,
    title: budget.title || '',
    date:
      budget.date ||
      `${nowDate.getMonth()}/${nowDate.getDate()}/${nowDate.getFullYear()}`,
    items: budget.items || [{ name: '', amount: '' }],
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate initial total
    let initialTotal = 0;
    formData.items.forEach((item) => {
      initialTotal += parseInt(item.amount);
    });
    setTotal(initialTotal);
  }, [formData.items]);

  const handleInputChange = (e, index: number) => {
    e.preventDefault();
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index][name] = value;
    setFormData({ ...formData, items });

    // Calculate total
    let total = 0;
    items.forEach((item) => {
      total += parseInt(item.amount);
    });
    setTotal(total);
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', amount: '' }],
    });

    // calculate total
    let total = 0;
    formData.items.forEach((item) => {
      total += parseInt(item.amount);
    });

    setTotal(total);
  };

  const handleRemoveItem = (index: number) => {
    const items = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items });

    // Calculate total
    let total = 0;
    items.forEach((item) => {
      total += parseInt(item.amount);
    });
    setTotal(total);
  };

  const handleClearAll = () => {
    setFormData({
      ...formData,
      items: [{ name: '', amount: '' }],
    });
    setTotal(0);
  };

  const handleSubmit = async () => {
    const res = await updateBudget(formData, budget._id); 
    if (res) {
      toast.success('Budget updated successfully');
    }
    // clear form data
    setFormData({
      organization: currentOrganization?._id,
      title: '',
      date: `${nowDate.getMonth()}/${nowDate.getDate()}/${nowDate.getFullYear()}`,
      items: [{ name: '', amount: '' }],
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
            Update Budget
          </Typography>
          <Typography sx={{ mr: 2 }} variant='h6' component='div'>
            Total: {total || 0}
          </Typography>
          <Button autoFocus color='inherit' onClick={handleSubmit}>
            Save
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
                {org.map((org) => (
                  <MenuItem key={org._id} value={org._id}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Title'
              fullWidth
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              label='Date'
              type='date'
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <Divider />
        {/* budget items */}
        {formData.items.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={6}>
                  <TextField
                    label='Item Name'
                    name='name'
                    fullWidth
                    value={item.name}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label='Amount'
                    name='amount'
                    type='number'
                    fullWidth
                    value={item.amount}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    edge='end'
                    color='error'
                    onClick={() => handleRemoveItem(index)}
                    aria-label='delete'
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
            {/* <Divider /> */}
          </React.Fragment>
        ))}
        <ListItem sx={{ justifyContent: 'end' }}>
          <Button color='success' onClick={handleAddItem}>
            <AddIcon sx={{ color: 'green' }} /> Add Item
          </Button>
          <Button color='warning' onClick={handleClearAll}>
            <CloseIcon sx={{ color: 'red' }} /> Clear All
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}
