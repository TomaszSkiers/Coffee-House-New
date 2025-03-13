import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)
      if (existingItem) {
        existingItem.quantity += newItem.quantity
      } else {
        state.items.push(newItem)
      }
    },
    removeItem: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)
    },
    increaseQuantity: (state, action) => {
      const id = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) item.quantity += 1
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        if (item.quantity === 1) return //tu
        else item.quantity -= 1
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})
export const selectCartItems = (state) => state.cart.items 
export const {addItem, removeItem, increaseQuantity, clearCart} = cartSlice.actions
export default cartSlice.reducer