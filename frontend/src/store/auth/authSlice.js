import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access_token: localStorage.getItem('access_token') || null,
    refresh_token: localStorage.getItem('refresh_token') || null,
    role: localStorage.getItem('role') || null,
    isAuthenticated: !!localStorage.getItem('access_token'),
  },
  reducers: {
    setCredentials: (state, action) => {
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.role = action.payload.role
      state.isAuthenticated = true
      localStorage.setItem('access_token', action.payload.access_token)
      localStorage.setItem('refresh_token', action.payload.refresh_token)
      localStorage.setItem('role', action.payload.role)
    },
    logout: (state) => {
      state.access_token = null
      state.refresh_token = null
      state.role = null
      state.isAuthenticated = false
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('role')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
