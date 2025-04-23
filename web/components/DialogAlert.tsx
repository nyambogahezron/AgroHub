import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  showConfirm: boolean;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  info: string;
  title: string;
};

export default function ConfirmationDialog({
  showConfirm,
  setShowConfirm,
  onConfirm,
  info,
  title,
}: Props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setShowConfirm(true);
    };

    const handleClose = () => {
      setShowConfirm(false);
    };

  return (
    <React.Fragment>
      <Dialog
        open={showConfirm}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {info}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
