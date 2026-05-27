import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/authSlice.js'

export const store = configureStore({
  reducer: { auth },
})
