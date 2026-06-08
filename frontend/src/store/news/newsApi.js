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
      query: ({ correntPage, limit = 5 }) => ({
        url: '/news',
        method: 'GET',
        params: { page: correntPage, limit },
      }),
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
  }),
})

export const { useGetNewsQuery, useGetDetailNewsQuery } = newsApi
