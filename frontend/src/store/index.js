import { configureStore } from '@reduxjs/toolkit'
import authКReducer from './auth/authSlice'
import newsReducer from './news/newsSlice'
import { newsApi } from './news/newsApi'
import { authApi } from './auth/authApi'
import { usersApi } from './users/usersApi'

export const store = configureStore({
  reducer: {
    auth: authКReducer,
    news: newsReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsApi.middleware,
      authApi.middleware,
      usersApi.middleware
    ),
})
