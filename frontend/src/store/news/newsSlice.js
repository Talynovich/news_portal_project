import { createSlice } from '@reduxjs/toolkit'

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    isLoading: true,
  },
  reducers: {
    setCredentialsNews: (state, action) => {
      state.news = action.payload
      state.isLoading = false
},
  },
  }
)

export const { setCredentialsNews } = newsSlice.actions
export default newsSlice.reducer
