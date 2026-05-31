import { createSlice } from '@reduxjs/toolkit'

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    isLoading: true,
  },
  reducers: {},
  }
)

export const {  } = newsSlice.actions
export default newsSlice.reducer
