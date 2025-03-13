import { useSelector, useDispatch } from 'react-redux'
import {
  Typography,
  Button,
  List,
  ListItem,
  CardMedia,
  IconButton,
  Box,
  Grid,
  useMediaQuery,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import { useTheme } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const theme = useTheme()
  // console.log(theme.palette.background)

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  // console.log('is mobile',isMobile)

  const handleIncreaseQuantity = (item) => {
    dispatch({ type: 'cart/increaseQuantity', payload: item.id })
  }

  const handleRemoveItem = (item) => {
    dispatch({ type: 'cart/removeItem', payload: item.id })
  }

  const handleDecreaseQuantity = (item) => {
    dispatch({ type: 'cart/decreaseQuantity', payload: item.id })
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1000,
        margin: 'auto',
        mt: 10,
        position: 'relative',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <List sx={{ mb: '115px' }}>
          {cartItems.map((item, index) => (
            <ListItem
              key={index}
              divider
              sx={{
                display: 'flex',
                p: 0,
              }}
            >
              <Grid container sx={{ height: 150 }}>
                <Grid
                  item
                  xs={4}
                  md={3}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <CardMedia
                    component="img"
                    sx={{ maxWidth: '150px', minWidth: 120 }}
                    image={`/products/${item.image}`}
                  />
                </Grid>
                <Grid
                  item
                  xs={8}
                  md={9}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1, // Maksymalnie 2 linie
                      overflow: 'hidden',
                      ml: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    price: {item.price} $
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    quantity: {item.quantity} piece
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 1,
                      alignItems: 'center',
                      ml: 2,
                    }}
                  >
                    <IconButton
                      sx={{ width: 30, height: 30 }}
                      onClick={() => handleDecreaseQuantity(item)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      sx={{ width: 30, height: 30 }}
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      sx={{ width: 30, height: 30 }}
                      onClick={() => handleRemoveItem(item)}
                    >
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}

      <Box
        sx={{
          display: cartItems.length > 0 ? 'block' : 'none',
          position: isMobile ? 'fixed' : 'absolute',
          bottom: isMobile ? 0 : null,
          left: isMobile ? 0 : null,
          top: isMobile ? null : '70px',
          right: isMobile ? null : '5%',
          width: isMobile ? '100%' : '300px',
          // height: isMobile ? null : '300px',
          // border: isMobile ? 'none' : '1px solid red',
          borderRadius: isMobile ? null : 2,
          backgroundColor: theme.palette.background.paper,
          p: 2,
          boxShadow: 3,
          pb: isMobile ? 5 : null,
        }}
      >
        <Typography variant="h6" textAlign="center">
          Total Price: {totalPrice.toFixed(2)} $
        </Typography>
        <Button variant='contained' color="primary" fullWidth component={RouterLink} to="/order">
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  )
}

export default Cart
