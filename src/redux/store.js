import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import cartReducer from './cartSlice'
import ordersReducer from './ordersSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
  devTools: import.meta.env.MODE !== 'production'
 
})

export default store
