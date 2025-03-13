import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserObject } from '../../redux/userSlice'
import { omit } from 'lodash'
import { addOrder } from '../../api/orders'
import { clearCart } from '../../redux/cartSlice'
import {  cleanOrder } from '../../redux/ordersSlice'

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
}

export function CustomDialog({
  open,
  onClose,
  title,
  children,
  onlyClose = false,
}) {
  const theme = useTheme()
  const token = useSelector((state) => state.user.accessToken)
  const userData = omit(useSelector(selectUserObject), 'accessToken', 'theme')
  const products = useSelector((state) => state.cart.items)
  const paymentMethod = useSelector((state) => state.orders.order.paymentMethod)
  // console.log(userData.address)
  const [loading, setLoading] = useState(false) // Dodanie stanu ładowania
  const [errorMessage, setErrorMessage] = useState(null) // Stan na błędy API
  const dispatch = useDispatch()

  // 🔹 Funkcja do wysyłania zamówienia z tokenem JWT
  const handleAddOrder = async () => {
    try {
      setLoading(true)
      setErrorMessage(null) // Reset komunikatu błędu przed wywołaniem API

      // Opcjonalnie: dynamiczne obliczenie totalPrice, np.:
      // const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

      await addOrder(
        {
          items: products,
          totalPrice: 100, // lub totalPrice jeśli obliczysz dynamicznie
          shippingAddress: userData.address,
          paymentMethod: paymentMethod,
        },
        token
      )

      // Po sukcesie można np. zamknąć dialog

      onClose()
      //todo wykasować produkty ze store i metodę płatności
      dispatch(clearCart())
      dispatch(cleanOrder())

    } catch (error) {
      setErrorMessage(
        `Błąd przy dodawaniu zamówienia: ${
          error.response ? error.response.data.message : error.message
        }`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} disableEnforceFocus>
      {title && (
        <DialogTitle
          color="info"
          sx={{ textAlign: 'center', color: theme.palette.customGreen }}
        >
          {title}
        </DialogTitle>
      )}
      <DialogContent>
        {children}
        {errorMessage && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
            {errorMessage}
          </p>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            ...buttonStyle,
            flexGrow: onlyClose ? 1 : 0, // Jeśli onlyClose === true, przycisk zajmie całe miejsce
          }}
          variant="contained"
          startIcon={<HighlightOffIcon />}
          onClick={onClose}
          disabled={loading} // Blokada przycisku podczas ładowania
        >
          {!onlyClose ? 'Cancel' : 'Close'}
        </Button>
        {!onlyClose ? (
          <Button
            sx={buttonStyle}
            variant="contained"
            startIcon={<CheckCircleIcon color="secondary" />}
            onClick={handleAddOrder}
            disabled={loading} // Blokada przycisku podczas ładowania
          >
            {loading ? 'Processing...' : 'Confirm'}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  )
}
