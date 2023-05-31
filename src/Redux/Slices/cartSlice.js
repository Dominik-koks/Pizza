import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
  price: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
        const findItem = state.items.find((obj) => obj.id === action.payload.id 
        && obj.size === action.payload.size && obj.type === action.payload.type)
        if(findItem) {
          findItem.count++
        } else {
          
            state.items.push({
                ...action.payload,
                count: 1
            })
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
                    return (obj.price * obj.count) + sum
                }, 0)
            
    },

    minusItem(state, action) {
        const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type)
        if(findItem.count > 0) {
            findItem.count--
            state.totalPrice -= action.payload.price
            if(state.totalPrice === 0) {
              state.items = []
            }
          }
    },

    removeItem(state, action) {
      state.items = state.items.filter(obj => obj.price !== action.payload.price)
      state.totalPrice -= action.payload.price * action.payload.count
    },


    clearItems(state) {
        state.items = []
        state.totalPrice = 0

    }

    
  },
})


export const selectCart = state => state.cart
export const selectNewPrice = state => state.cart.price
export const selectCartItem = par => state => state.cart.items.find(obj => obj.id === par.id && obj.size === par.sizes[par.activeSizeIndex] && obj.type === par.typeNames[par.activeTypeIndex])

export const {addItem, removeItem, clearItems, minusItem, PlusPrice, MinusPrice} = cartSlice.actions

export default cartSlice.reducer