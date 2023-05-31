import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params, thunkAPI) => {
      const { sortBy, order, category, search, currentPage,} = params  
      const {data} = await axios.get(`https://646870dfe99f0ba0a824be78.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`)


      return data
    }
  )


const initialState = { 
  status: 'loading',  // isLoading | succes | error
  items: [],
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload
            
    },


    
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
        state.status = 'loading'
        state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
        state.items = action.payload
        state.status = 'success'
    },
    [fetchPizzas.rejected]: (state, action) => {
        state.status = 'error'
        state.items = []
    },
  }
})

export const selectPizza = state => state.pizza

export const {setItems, } = pizzasSlice.actions

export default pizzasSlice.reducer