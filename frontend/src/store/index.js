import { configureStore } from '@reduxjs/toolkit'
import authКReducer from './auth/authSlice'
import newsReducer from './news/newsSlice'
import { newsApi } from './news/newsApi'
import { authApi } from './auth/authApi.js'

export const store = configureStore({
  reducer: {
    auth: authКReducer,
    news: newsReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware, authApi.middleware),
})
