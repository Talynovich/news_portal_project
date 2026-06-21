import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseurl } from '../../contant/contant'
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseurl}`,
    tagTypes: ['Users'],
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access_token
      if (token) {
        try {
          headers.set('authorization', `Bearer ${token}`)
        } catch (e) {
          console.log(`Critical error in authorization token: ${e}`)
        }
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getUser: build.query({
      query: () => ({
        url: '/me',
      }),
      providesTags: ['Users'],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    register: build.mutation({
      query: (credential) => ({
        url: 'users/register',
        method: 'POST',
        body: credential,
      }),
      invalidatesTags: ['Users'],
    }),
    getAllUsers: build.query({
      query: () => ({
        url: '/users/all',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})
export const {
  useRegisterMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = usersApi
