'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useRouter } from 'next/navigation';

export default function LatestTransactions(): React.JSX.Element {
  const { transactions } = useGlobalContext();
  const router = useRouter();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title='Latest transactions' />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.slice(0, 10).map((transaction) => {
              return (
                <TableRow hover key={transaction._id}>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    {dayjs(transaction.transaction_date).format('MMM D, YYYY')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color='inherit'
          endIcon={<ArrowRightIcon fontSize='var(--icon-fontSize-md)' />}
          size='small'
          variant='text'
          onClick={() => router.push('/dashboard/transactions')}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
