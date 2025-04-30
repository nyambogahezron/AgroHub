'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  List,
  ListItem,
  Divider,
  Stack,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '@/context/GlobalProvider';
import PreLoading from '@/components/Loading';
import { getSingleBudget } from '@/query/api';
import { useParams, useRouter } from 'next/navigation';
import { BudgetProps } from '@/types';

export default function ViewBudget() {
  const { organization: org } = useGlobalContext();
  const [budgetData, setBudgetData] = React.useState<BudgetProps>();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();
  const router = useRouter();

  React.useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const data = await getSingleBudget(id.toString());
      if (data && data.budget) {
        setBudgetData(data.budget);
        setIsLoading(false);
      } else {
        setBudgetData(undefined);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (isLoading) {
    return <PreLoading />;
  }
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
          <Typography sx={{ ml: 5, flex: 1 }} variant='h6' component='div'>
            {budgetData?.title} Budget Info
          </Typography>
          <Typography sx={{ mr: 2 }} variant='h6' component='div'>
            Total: {budgetData?.amount || 0}
          </Typography>
        </Toolbar>
      </AppBar>
      <List sx={{ mt: 5, px: 2 }}>
        <Grid container spacing={2} sx={{ marginY: 2, paddingX: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
              Organization
            </Typography>
            <Typography variant='body1'>
              {org.find((o) => o._id === budgetData?.organization)?.name ||
                'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
              Title
            </Typography>
            <Typography variant='body1'>{budgetData?.title}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
              Date
            </Typography>
            <Typography variant='body1'>{budgetData?.date}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <ListItem sx={{ my: 2 }}>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={6}>
              <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1'>
                Item Name
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1'>
                Amount
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />

        {budgetData &&
          budgetData?.items.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid item xs={6}>
                    <Typography variant='body1'>{item.name}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='body1'>{item.amount}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        <ListItem>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={6}>
              <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1'>
                Total Items {budgetData?.items.length}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1'>
                Total Amount : {budgetData?.amount}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Stack>
  );
}
