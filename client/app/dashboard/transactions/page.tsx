'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import PlusIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import TransactionsTable from '@/components/dashboard/transactions/transactions-table';
import AddTransaction from '@/components/dashboard/transactions/add-transaction';

export default function Page(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleModelClose = () => setOpen(false);

  return (
    <Stack spacing={3} className='px-3 m-auto w-full'>
      <Stack className='flex flex-row items-baseline justify-between'>
        <Stack spacing={1} sx={{ flex: '1 1 auto', mt: 4 }}>
          <Typography color='primary' variant='h4'>
            Transaction
          </Typography>
          <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
            <Button color='primary' startIcon={<UploadIcon />}>
              Import
            </Button>
            <Button color='primary' startIcon={<DownloadIcon />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon />}
            variant='contained'
            onClick={() => setOpen(true)}
          >
            Add Transaction
          </Button>
        </div>
      </Stack>
      <TransactionsTable />
      <AddTransaction open={open} handleModelClose={handleModelClose} />
    </Stack>
  );
}