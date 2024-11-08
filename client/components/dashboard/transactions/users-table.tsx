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
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { deleteUser } from '@/query/api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function UsersTable() {
  const [open, setOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null
  );
  const {
    organization,
    users,
    setUsers,
  } = useGlobalContext();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const handleModelOpen = (id: string) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (selectedUserId) {
      const data = await deleteUser(selectedUserId);

      if (data) {
        const newData = users.filter(
          (user) => user._id !== selectedUserId
        );
        setUsers(newData);

        toast.success('User deleted successfully');
      }
      setOpen(false);
      setSelectedUserId(null);
    }
  };

  const rowIds = React.useMemo(() => {
    return users?.map((users) => users._id);
  }, [users]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < users?.length;
  const selectedAll = users?.length > 0 && selected?.size === users?.length;

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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((row) => {
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
                        <Typography variant='subtitle2'>{row.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack
                        sx={{ alignItems: 'center' }}
                        direction='row'
                        spacing={2}
                      >
                        <Typography variant='subtitle2'>{row.email}</Typography>
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
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.phone}</TableCell>
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
                              router.push(`/dashboard/users/update/${row._id}`)
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
                              {'Delete User'}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id='alert-dialog-description'>
                                You are about to delete this user, are you
                                sure?
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
                              router.push(`/dashboard/users/${row._id}`)
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
