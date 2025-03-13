import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { UniversalLabel } from './UniversalLabel'
import { useDispatch, useSelector } from 'react-redux'
import { addPaymentMethod } from '../../redux/ordersSlice'
import { useTheme } from '@emotion/react'

export function PaymentMethods() {
  // const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const theme = useTheme()
  const paymentMethod = useSelector((state) => state.orders.order.paymentMethod)

  //zapis metody płatności
  function handleSetValue(e) {
    // setValue(e.target.value)
    dispatch(
      addPaymentMethod({ field: 'paymentMethod', value: e.target.value })
    )
  }

  console.log('paymentMethods się renderuje')
  console.log(paymentMethod)

  return (
    <Box
      sx={{
        mt: 4,
        p: 2,
        border: `1px solid ${theme.palette.customBlue}`,
        borderRadius: 1,
        position: 'relative',
      }}
    >
      <FormControl
        fullWidth
        sx={{
          mt: 2,
        }}
      >
        <InputLabel
          id="select-label"
          sx={{ backgroundColor: theme.palette.background.default, px: 1 }}
        >
          choose payment method
        </InputLabel>
        <Select labelId="select-label" 
        value={paymentMethod === undefined ? '' : paymentMethod} 
        onChange={handleSetValue}>
          <MenuItem value="bank transfer">bank transfer</MenuItem>
          <MenuItem value="cash">cash</MenuItem>
          <MenuItem value="I take it for free">I take it for free :)</MenuItem>
        </Select>
      </FormControl>
      <UniversalLabel value="payment methods:" />
    </Box>
  )
}
