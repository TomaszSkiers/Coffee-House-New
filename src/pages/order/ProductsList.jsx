import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../redux/cartSlice'
import { FakeTextField } from './FakeTextField'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import { UniversalLabel } from './UniversalLabel'
import { useMemo } from 'react'

export function ProductList() {
  const cart = useSelector(selectCartItems)
  const theme = useTheme()
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cart])

  if (cart.length === 0) {
    return (
      <FakeTextField
        sx={{
          mt: 2,
        }}
        label=""
        value={
          <>
            <Typography component="span" sx={{ color: 'red' }}>
              brak produktów w koszyku
            </Typography>
            <Link to="/">przejdź na stronę domową</Link>
          </>
        }
      />
    )
  }

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.customBlue}`,
        borderRadius: '4px',
        mt: 4,
        p: 2,
        position: 'relative',
      }}
    >
      {cart.map((product, index) => (
        <Box
          key={product.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pb: '1px',
          }}
        >
          <FakeTextField
            label={index + 1}
            value={
              <>
                <span>{product.title}</span> / quantity:
                <span
                  style={{
                    color: theme.palette.customGreen,
                    fontWeight: 'bold',
                  }}
                >
                  {product.quantity}
                </span>{' '}
                / price:
                <span
                  style={{
                    color: theme.palette.customGreen,
                    fontWeight: 'bold',
                  }}
                >
                  {product.price * product.quantity} $
                </span>
              </>
            }
            sx={{ mt: 1, width: '100%' }}
          />
        </Box>
      ))}

      <FakeTextField
        label="total price:"
        value={<Typography component="span" color="red">{totalPrice} $</Typography>}
        sx={{ mt: 2 }}
      />

      {/**label for products list */}
      <UniversalLabel value="product list:" />
    </Box>
  )
}
