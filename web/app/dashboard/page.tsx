'use client';

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Budget } from '@/components/dashboard/overview/budget';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalUsers } from '@/components/dashboard/overview/total-users';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
import LatestTransactions from '@/components/dashboard/overview/latest-transactions';
import LatestActivities from '@/components/dashboard/overview/latest-activities';
import { useGlobalContext } from '@/context/GlobalProvider';
import { currencyFormatter } from '@/utils/currency-formatter';

export default function Page(): React.JSX.Element {
  const { transactions, budgetData } = useGlobalContext();


  const totalExpenses = transactions
    .filter((transaction) => transaction.category === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalSales = transactions
    .filter((transaction) => transaction.category === 'sales')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalProfit = currencyFormatter(totalSales - totalExpenses).toString();

  return (
    <Grid container spacing={3} className='px-3 py-2'>
      <Grid lg={3} sm={6} xs={12}>
        <Budget />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalUsers />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={75.5} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value={totalProfit || '0'} />
      </Grid>
      <Grid lg={8} xs={12}>
        <Sales sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic
          chartSeries={[totalExpenses, totalSales]}
          labels={['Expenses', 'Sales']}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <LatestActivities />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <LatestTransactions />
      </Grid>
    </Grid>
  );
}
