import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseurl } from '../../contant/contant.js'

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseurl}`,
  }),
  tagTypes: ['News'],
  endpoints: (build) => ({
    getNews: build.query({
      query: () => '/news',
      providesTags: ['News'],
    }),
    getDetailNews: build.query({
      query: (id) => `/news/${id}`,
      providesTags: ['News'],
    }),
    deleteNews: build.mutation({
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
  useGetDetailNewsQuery,
  useSavePatientMutation,
} = newsApi
