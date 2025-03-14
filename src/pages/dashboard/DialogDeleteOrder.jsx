import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'
import { useDeleteOrder } from '../../api/orders'
import { useQueryClient } from '@tanstack/react-query'


export function DialogDeleteOrder({ open, handleClose, target }) {
  const { deleteOrder, isLoading, error } = useDeleteOrder()
  const queryClient = useQueryClient()



  const handleDelete = async () => {
    try {
      
      await deleteOrder(target)
      queryClient.invalidateQueries(['orders'])
      handleClose(true)
    } catch (error) {
      console.error(error)
    }
  }


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
          <Typography component="span" color="error">
            {error ? (
              <Typography component="span" color="error">
                error: {error.message}
              </Typography>
            ) : (
              <Typography>
                The operation is irreversable, you want be able to restore the
                order.
              </Typography>
            )}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} size="small" variant="contained">
          cancel
        </Button>
        <Button
          onClick={() => handleDelete(target)}
          size="small"
          variant="contained"
          disabled={isLoading}
          color="warning"
          autoFocus
        >
          {isLoading ? 'deleting...' : 'confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
//? trzeba zrobić coś takiego jak jest błąd to żeby dialog się nie chował tylko pokazał przycisk ok