import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { OrganizationDialogProps } from '@/types';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';

export default function OrganizationDialog(props: OrganizationDialogProps) {
  const { onClose, open, openCreateOrgModal } = props;
  const { organization, currentOrganization, setCurrentOrganizationData } =
    useGlobalContext();

  const handleClose = () => onClose('');

  const handleListItemClick = async (value: any) => {
    try {
      setCurrentOrganizationData(value.item);
      toast.success('Organization set successfully');
    } catch (error) {
      toast.error('Failed to set organization');
    }
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set Default Organization</DialogTitle>
      <List sx={{ pt: 0, maxWidth: 500, width: {sm:500, lg:500} }}>
        {organization &&
          organization?.map((item: any) => (
            <ListItem
              disableGutters
              key={item?._id}
              className={`${
                currentOrganization?._id === item?._id
                  ? 'border-l-4 border-green-600'
                  : ''
              }`}
            >
              <ListItemButton onClick={() => handleListItemClick({ item })}>
                <ListItemAvatar>
                  {item?.logo ? (
                    <Avatar alt={item?.name} src={item?.logo} />
                  ) : (
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                      {item?.name.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                </ListItemAvatar>
                <Box>
                  <ListItemText primary={item?.name} />
                  <ListItemText primary={item?.email} />
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => openCreateOrgModal()}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Add Organization' />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}
