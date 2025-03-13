import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    orders: [],
    order: {}
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder(state, action) {
            state.orders.push(action.payload)
        },
        addPaymentMethod(state, action) {
            const {field, value} = action.payload
            state.order = {...state.order, [field]: value}
        },
        cleanOrder(state) {
            state.order = {}
        }
    }
})

export const {addPaymentMethod} = ordersSlice.actions
export const {addOrder} = ordersSlice.actions
export const {cleanOrder} = ordersSlice.actions
export const selectAllOrders = (state) => state.orders.orders
export default ordersSlice.reducer

/**
 * how will be look like the object in slice
 * orderObject = {
 *  userData: {},
 *  products: {},
 *  paymentMethod: '',
 * }
 */