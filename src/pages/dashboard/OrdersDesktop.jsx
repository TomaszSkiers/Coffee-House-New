import {
  Box,
  Button,
  Card,
  CardActions,

  Divider,
  Typography,
} from '@mui/material'
import { useFetchOrders } from '../../api/orders'
import { useState } from 'react'
// import { DialogDeleteOrder } from './DialogDeleteOrder'

export default function OrdersDesktop() {
  const { data, isLoading, isError, error } = useFetchOrders()

  const [open, setOpen] = useState(false)
  const [target, setTarget] = useState(null)

  const handleClickOpen = (eTarget) => {
    setTarget(eTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (isLoading) return <Typography>loading...</Typography>
  if (isError) return <Typography>error: {error.message}</Typography>

  console.log(data.orders)

  return (
    <Box>
      <Typography>Your orders:</Typography>

      {data.orders.map((order) => (
        <Card
          key={order.id}
          sx={{
            m: 2,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            filter: open ? 'blur(1px)' : 'none',
          }}
        >
          <Box>
            <Typography>order number: {order.id}</Typography>
            <Typography>
              date: {new Date(order.createdAt).toLocaleDateString('pl-PL')}
            </Typography>
            <Divider sx={{ my: 1 }}></Divider>
            {order.items.map((item, index) => (
              <Typography key={item.id}>
                {' '}
                {index + 1}- {item.title}
              </Typography>
            ))}
            <Divider sx={{ my: 1 }}></Divider>
            <Typography> {order.shippingAddress}</Typography>
            <Divider sx={{ my: 1 }}></Divider>
            <Typography> payment method: {order.paymentMethod}</Typography>
            <Typography> status: {order.status}</Typography>
          </Box>
          <CardActions
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography>
              total price:{' '}
              <Typography
                component="span"
                sx={{ color: 'red', fontWeight: 'bold' }}
              >
                {order.totalPrice} $
              </Typography>
            </Typography>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={()=>handleClickOpen(order.id)}
            >
              Delete order
            </Button>
          </CardActions>
        </Card>
      ))}

      {/** Dialog component */}
      {/* <DialogDeleteOrder target={target} open={open} handleClose={handleClose}/> */}
      
    </Box>
  )
}
