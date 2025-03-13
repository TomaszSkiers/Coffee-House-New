import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'

//! do ogarnięcia usuwanie zamówień 

export function DialogDeleteOrder({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Are you sure you wnat to delete the order?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography component='span' color="error">
            The operation is irreversable, you want be able to restore the
            order.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} size='small' variant='contained'>Disagree</Button>
        <Button onClick={handleClose} size='small' variant='contained' color='warning'autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

