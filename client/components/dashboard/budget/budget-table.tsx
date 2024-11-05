'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useSelection } from '@/hooks/use-selection';
import { BudgetProps, BudgetTableProps } from '@/types';
import { Box, IconButton } from '@mui/material';
import { getAllBudgets } from '@/query/api';
import PreLoading from '@/components/Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useRouter } from 'next/navigation';

function noop(): void {
  // do nothing
}

export default function BudgetTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: BudgetTableProps) {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [budgetData, setBudgetData] = React.useState<BudgetProps[]>([]);
  const { organization } = useGlobalContext();
  const router = useRouter();

  // fetch all budgets
  React.useEffect(() => {
    setIsLoaded(true);
    async function fetchBudgets() {
      const data = await getAllBudgets();
      console.log('budgets', data);
      if (data) {
        setBudgetData(data.budgets);
        setIsLoaded(false);
      }
    }
    fetchBudgets();
  }, []);

  const rowIds = React.useMemo(() => {
    return rows.map((budgetData) => budgetData._id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      {isLoaded && <PreLoading />}
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgetData &&
              budgetData.map((row) => {
                const isSelected = selected?.has(row._id);

                return (
                  <TableRow key={row._id} hover selected={isSelected}>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            selectOne(row._id);
                          } else {
                            deselectOne(row._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        sx={{ alignItems: 'center' }}
                        direction='row'
                        spacing={2}
                      >
                        <Typography variant='subtitle2'>{row.title}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack
                        sx={{ alignItems: 'center' }}
                        direction='row'
                        spacing={2}
                      >
                        <Typography variant='subtitle2'>
                          {organization
                            ? organization.find(
                                (org) => org._id === row.organization
                              )?.name || 'N/A'
                            : 'N/A'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Stack
                        sx={{ alignItems: 'center' }}
                        direction='row'
                        spacing={2}
                      >
                        <Stack direction='row' spacing={2} alignItems='center'>
                          <IconButton
                            onClick={() =>
                              router.push(`/dashboard/budget/${row._id}`)
                            }
                            size='small'
                            color='primary'
                          >
                            <EditIcon sx={{ color: 'green' }} />
                          </IconButton>
                        </Stack>
                        <Stack direction='row' spacing={2} alignItems='center'>
                          <IconButton
                            onClick={noop}
                            size='small'
                            color='primary'
                          >
                            <DeleteIcon sx={{ color: 'red' }} />
                          </IconButton>
                        </Stack>
                        <Stack direction='row' spacing={2} alignItems='center'>
                          <IconButton
                            onClick={noop}
                            size='small'
                            color='primary'
                          >
                            <VisibilityIcon sx={{ color: 'blue' }} />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
