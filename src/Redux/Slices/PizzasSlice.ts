import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../Store'



type Pizza = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: string;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type PizzaSliceState = {
  status:  Status
  items: Pizza[]
}


export type SearchPizzaParams = {
  sortBy: string
  order: string
  category: string
  search: string
  currentPage: string
}


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params: Record<string, string>) => {
      const { sortBy, order, category, search, currentPage,} = params
      const {data} = await axios.get<Pizza[]>(`https://646870dfe99f0ba0a824be78.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`)
      
      
      return data
    }
    )



const initialState: PizzaSliceState = { 
  status: Status.LOADING,
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
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
       state.items = []
    })
  }
})

export const selectPizza = (state: RootState) => state.pizza

export const {setItems, } = pizzasSlice.actions

export default pizzasSlice.reducer