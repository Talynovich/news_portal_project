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
