import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseurl } from '../../contant/contant'
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseurl}`,
  }),
  endpoints: (build) => ({
    getUser: build.query({
      query: () => ({
        url: '/me',
      }),
    }),
    register: build.mutation({
      query: (credential) => ({
        url: 'users/register',
        method: 'POST',
        body: credential,
      }),
      getUser: build.query({
        query: () => ({
          url: '/me',
        }),
      }),
    }),
  }),
})
export const { useRegisterMutation } = usersApi
