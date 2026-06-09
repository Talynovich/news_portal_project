import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseurl } from '../../contant/contant.js'

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseurl}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access_token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
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
    uploadImage: build.mutation({
      query: (file) => {
        const formData = new FormData()
        formData.append('file', file)
        return {
          url: '/upload',
          method: 'POST',
          body: formData,
        }
      },
    }),
    createNews: build.mutation({
      query: (newsData) => ({
        url: '/news',
        method: 'POST',
        body: newsData,
      }),
    }),
  }),
})

export const {
  useGetNewsQuery,
  useGetDetailNewsQuery,
  useCreateNewsMutation,
  useUploadImageMutation,
} = newsApi
