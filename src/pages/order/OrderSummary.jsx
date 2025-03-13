import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { CustomDialog } from './CustomDialog'
import { UserData } from './UserData'
import { useTheme } from '@emotion/react'
import { ProductList } from './ProductsList'
import { PaymentMethods } from './PaymentMethods'
import { useSelector } from 'react-redux'

export function OrderSummary() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [onlyClose, setOnlyClose] = useState(false)
  const theme = useTheme()
  const paymentMethod = useSelector((state) => state.orders.order.paymentMethod)
  const cart = useSelector((state) => state.cart.items)

  //debugger
  console.log(paymentMethod)

  //debugger
  useEffect(() => {
    console.log('onlyClose', onlyClose)
  }, [onlyClose])

  const handleConfirm = () => {
    if (cart.length === 0 && !paymentMethod){
      setTitle('no products and no payment method selected')
    }else if (cart.length === 0){
      setTitle('no products in the cart')
    }else if (!paymentMethod){
      setTitle('no payment method selected')
    }else{
      setTitle('confirm order')
    }
     
    setOnlyClose(cart.length === 0 || !paymentMethod) //true
    setOpen(true)
  }

  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: 'auto',
        mt: '70px',
        filter: open ? 'blur(1px)' : 'none',
      }}
    >
      <Typography color={theme.palette.customGreen} sx={{ p: 2 }}>
        ORDER SUMMARY
      </Typography>

      {/** here will insert component that display user data*/}
      <UserData />

      {/** here will insert component that display list of products */}
      <ProductList />

      {/** here will insert component that display payment methods */}
      <PaymentMethods />

      {/** po kliknięciu:
       * uruchamiam przycisk potwierdzenia zamówienia ale najpierw sprawdzam czy są produkty,
       * później sprawdzam czy została ustawiona metoda płatności
       */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, mb: 5 }}
        onClick={handleConfirm}
      >
        confirm order
      </Button>
      <CustomDialog
        open={open}
        onlyClose={onlyClose}
        onClose={() => setOpen(false)}
        title={title}
      />
    </Box>
  )
}
