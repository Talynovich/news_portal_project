import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access_token: localStorage.getItem('access_token') || null,
    isAuthenticated: !!localStorage.getItem('access_token'),
  },
  reducers: {
    setCredentials: (state, action) => {
      state.access_token = action.payload.access_token
      state.isAuthenticated = true
      localStorage.setItem('access_token', action.payload.access_token)
    },
    logout: (state) => {
      state.access_token = null
      state.isAuthenticated = false
      localStorage.removeItem('access_token')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
