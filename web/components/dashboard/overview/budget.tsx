'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Icon } from '@mui/material';
import { useGlobalContext } from '@/context/GlobalProvider';

export function Budget(): React.JSX.Element {
  const { budgetData } = useGlobalContext();
  const [total, setTotal] = React.useState('');

  React.useEffect(() => {
    const total = budgetData.reduce((acc, curr) => acc + curr.amount, 0);
    const formattedTotal = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(total);

    setTotal(formattedTotal);
  }, [budgetData]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction='row'
            sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color='text.secondary' variant='overline'>
                Budget
              </Typography>
              <Typography variant='h4'>{total}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: 'var(--mui-palette-primary-main)',
                height: '56px',
                width: '56px',
              }}
            >
              <Icon component={AttachMoneyIcon} sx={{ color: 'white' }} />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
