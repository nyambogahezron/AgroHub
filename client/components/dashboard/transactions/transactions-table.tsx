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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { deleteTransaction } from '@/query/api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function TransactionsTable() {
  const [open, setOpen] = React.useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = React.useState<
    string | null
  >(null);
  const { transactions, setTransactions } = useGlobalContext();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setSelectedTransactionId(null);
  };

  const handleModelOpen = (id: string) => {
    setSelectedTransactionId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (selectedTransactionId) {
      const data = await deleteTransaction(selectedTransactionId);

      if (data) {
        const newData = transactions.filter(
          (transaction) => transaction._id !== selectedTransactionId
        );
        setTransactions(newData);

        toast.success('Transaction deleted successfully');
      }
      setOpen(false);
      setSelectedTransactionId(null);
    }
  };

  const rowIds = React.useMemo(() => {
    return transactions?.map((transaction) => transaction._id);
  }, [transactions]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < transactions?.length;
  const selectedAll =
    transactions?.length > 0 && selected?.size === transactions?.length;

  return (
    <Card>
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
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactions.map((row) => {
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
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      {new Date(row.transaction_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Stack
                        sx={{ alignItems: 'center' }}
                        direction='row'
                        spacing={2}
                      >
                        <Stack direction='row' spacing={2} alignItems='center'>
                          <IconButton
                            onClick={() =>
                              router.push(
                                `/dashboard/transactions/update/${row._id}`
                              )
                            }
                            size='small'
                            color='primary'
                          >
                            <EditIcon sx={{ color: 'green' }} />
                          </IconButton>
                        </Stack>
                        <Stack direction='row' spacing={2} alignItems='center'>
                          <IconButton
                            onClick={() => handleModelOpen(row._id)}
                            size='small'
                            color='primary'
                          >
                            <DeleteIcon sx={{ color: 'red' }} />
                          </IconButton>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby='alert-dialog-title'
                            aria-describedby='alert-dialog-description'
                          >
                            <DialogTitle id='alert-dialog-title'>
                              {'Delete Transaction'}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id='alert-dialog-description'>
                                You are about to delete this transaction, are
                                you sure?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>Disagree</Button>
                              <Button onClick={handleDelete} autoFocus>
                                Agree
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Stack>
                        <Stack direction='row' spacing={2} alignItems='center'>
                          <IconButton
                            onClick={() =>
                              router.push(`/dashboard/transactions/${row._id}`)
                            }
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
