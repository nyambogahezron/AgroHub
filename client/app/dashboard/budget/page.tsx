'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import PlusIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import BudgetTable from '@/components/dashboard/budget/budget-table';
import { budgetData } from '@/data';
import { BudgetProps} from '@/types';
import AddBudgetDialog from '@/components/dashboard/budget/add-budget';

export default function Page(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleModelClose = () => setOpen(false);

  const page = 0;
  const rowsPerPage = 5;

  const paginatedBudget = applyPagination(budgetData, page, rowsPerPage);

  return (
    <Stack spacing={3} className='px-3 m-auto w-full'>
      <Stack className='flex flex-row items-baseline justify-between'>
        <Stack spacing={1} sx={{ flex: '1 1 auto', mt: 4 }}>
          <Typography color='primary' variant='h4'>
            Budgets
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
            Add
          </Button>
        </div>
      </Stack>
      <BudgetTable
        count={paginatedBudget.length}
        page={page}
        rows={paginatedBudget}
        rowsPerPage={rowsPerPage}
      />
      <AddBudgetDialog
        open={open}
        handleModelClose={handleModelClose}
      />
    </Stack>
  );
}

function applyPagination(
  rows: BudgetProps[],
  page: number,
  rowsPerPage: number
): any {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
