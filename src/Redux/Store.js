import { configureStore } from '@reduxjs/toolkit'
import filter from './Slices/FilterSlice'
import cart from './Slices/cartSlice'
import pizza from './Slices/PizzasSlice'


export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
})