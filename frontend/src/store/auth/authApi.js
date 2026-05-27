import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { authurl } from '../../contant/contant'
import { logout, setCredentials } from './authSlice'

// 1. Создаем БАЗОВЫЙ запрос (инструмент для сетевых вызовов)
const baseQuery = fetchBaseQuery({
  baseUrl: `${authurl}`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken
    if (token) {
      try {
        headers.set('authorization', `Bearer ${token}`)
      } catch (e) {
        console.log(`Критическая ошибка в токене авторизации: ${e}`)
      }
    }
    return headers
  },
})

// 2. Создаем ОБЕРТКУ с логикой Refresh Token
// Теперь она видит baseQuery, объявленный выше
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshToken = api.getState().auth.refreshToken

    // Пробуем обновиться
    const refreshResult = await baseQuery(
      {
        url: 'refresh',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      // Сохраняем новые данные (токены)
      api.dispatch(setCredentials(refreshResult.data))
      // Повторяем изначальный запрос
      result = await baseQuery(args, api, extraOptions)
    } else {
      // Если обновить не удалось — выходим
      api.dispatch(logout())
    }
  }
  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    login: build.mutation({
      query: (credential) => ({
        url: '',
        method: 'POST',
        body: credential,
      }),
    }),
    getUser: build.query({
      query: () => ({
        url: '/me',
      }),
    }),
  }),
})

export const { useLoginMutation, useGetUserQuery } = authApi
