import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseurl } from '../../contant/contant.js'

export const newsApi = createApi({
  reducerPath: 'news',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseurl}`,
  }),
  tagTypes: ['News'],
  endpoints: (build) => ({
    getNews: build.query({
      query: () => '/news',
      providesTags: ['News'],
    }),
    deletePatient: build.mutation({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
      invalidatesTags: ['News'],
    }),
    savePatient: build.mutation({
      query: (data) => ({
        url: data.id ? `/${data.id}` : '/',
        method: data.id ? 'PUT' : 'POST',
        body: data,
      }),
      invalidatesTags: ['News'],
    }),
  }),
})

export const {
  useGetNewsQuery,
  useDeletePatientMutation,
  useSavePatientMutation,
} = newsApi
