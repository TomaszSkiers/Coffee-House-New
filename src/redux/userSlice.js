import { createSlice } from '@reduxjs/toolkit'

 const initialState = {
    name: localStorage.getItem('name') || sessionStorage.getItem('name') || 'login',
    surname: localStorage.getItem('surname') || 'no data',
    email: localStorage.getItem('email') || 'no data',
    phone: localStorage.getItem('phone') || 'no data',
    address: localStorage.getItem('address') || 'no data',
    accessToken: localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || null,
    theme: localStorage.getItem('theme') || 'no data',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload }
    },

    logoutUser: () => {
      return initialState
    },

    updateUserField: (state, action) => {
      const {key, value} = action.payload
      if(key in state) state[key] = value
    }
  },
})

export const { setUser, logoutUser, updateUserField } = userSlice.actions

export const selectUserName = (state) => state.user.name
export const selectUserObject = (state) => state.user

export default userSlice.reducer

