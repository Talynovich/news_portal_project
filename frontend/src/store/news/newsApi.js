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
      query: ({ correntPage, limit = 5, authorId }) => ({
        url: '/news',
        method: 'GET',
        params: { page: correntPage, limit, authorId },
      }),
      providesTags: ['News'],
    }),
    getDetailNews: build.query({
      query: (id) => `/news/${id}`,
      providesTags: ['News'],
    }),
    deleteNews: build.mutation({
      query: (id) => ({ url: `/news/${id}`, method: 'DELETE' }),
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
      invalidatesTags: ['News'],
    }),
    addCommentsNews: build.mutation({
      query: (newsData) => ({
        url: `/comments/news/${newsData.newsId}`,
        method: 'POST',
        body: { text: newsData.text },
      }),
      invalidatesTags: ['News'],
    }),
  }),
})

export const {
  useGetNewsQuery,
  useGetDetailNewsQuery,
  useCreateNewsMutation,
  useUploadImageMutation,
  useDeleteNewsMutation,
  useAddCommentsNewsMutation,
} = newsApi
