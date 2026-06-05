import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { authurl } from '../../contant/contant'
import { logout, setCredentials } from './authSlice'

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

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshToken = api.getState().auth.refreshToken

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
      api.dispatch(setCredentials(refreshResult.data))
      result = await baseQuery(args, api, extraOptions)
    } else {
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
        url: '/login',
        method: 'POST',
        body: credential,
      }),
    }),
    refresh: build.mutation({
      query: (credential) => ({
        url: '/refresh',
        method: 'POST',
        body: { refresh_token: credential },
      }),
    }),
  }),
})

export const { useLoginMutation, useRefreshMutation } = authApi
