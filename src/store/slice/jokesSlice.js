import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = 'https://candaan-api.vercel.app/api'

const initialState = {
  data: [],
  isLoading: true,
  err: false,
}

export const fetchJokes = createAsyncThunk('jokes/fetchJokes', async () => {
  const res = await fetch('https://candaan-api.vercel.app/api/text')
  const data = await res.json()
  return data.data
})

const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchJokes.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchJokes.fulfilled, (state, action) => {
      state.data = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchJokes.rejected, (state, action) => {
      state.data = []
      state.isLoading = false
      state.err = true
    })
  },
})

export default jokesSlice.reducer
