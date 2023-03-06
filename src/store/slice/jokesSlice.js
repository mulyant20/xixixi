import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = 'https://candaan-api.vercel.app/api'

const initialState = {
  data: [],
  joke: null,
  isLoading: true,
  isOpen: false,
  err: false,
}

export const fetchJokes = createAsyncThunk('jokes/fetchJokes', async () => {
  const res = await fetch(`${BASE_URL}/text`)
  const data = await res.json()
  return data.data
})

export const fetchRandomJokes = createAsyncThunk(
  'jokes/fetchRandomJokes',
  async () => {
    const res = await fetch(`${BASE_URL}/text/random`)
    const data = await res.json()
    return data.data
  }
)

const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    closeModal: (state, action) => {
      state.joke = null
      state.isOpen = false
    },
    openModal: (state, action) => {
      state.isOpen = true
    },
  },
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
    builder.addCase(fetchRandomJokes.pending, (state, action) => {
      // state.isLoading = true
    })
    builder.addCase(fetchRandomJokes.fulfilled, (state, action) => {
      state.joke = action.payload
      state.isLoading = false
      state.isOpen = true
    })
    builder.addCase(fetchRandomJokes.rejected, (state, action) => {
      state.joke = null
      state.isLoading = false
      state.err = true
    })
  },
})

export const { closeModal, openModal } = jokesSlice.actions
export default jokesSlice.reducer
