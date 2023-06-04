import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../Store'


export type CartItem =  {
  id: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}


type ParType = {
  id: string
  sizes: number[]
  activeSizeIndex: number
  typeNames: string[]
  activeTypeIndex: number
}

type MinusAction = { 
  id: string 
  price: number 
  size: number
  count: number 
  type: string
}

type RemoveType = {
  id: string
  price: number
  count: number
}



type CartSliceState = {
  totalPrice: number;
  items: CartItem[];
  price: number;
}



const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
  price: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
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

    minusItem(state, action: PayloadAction<MinusAction>) {
        const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type)
        if(findItem?.count && findItem.count > 0) {
            findItem.count--
            state.totalPrice -= action.payload.price
            if(state.totalPrice === 0) {
              state.items = []
            }
          }
    },

    removeItem(state, action: PayloadAction<RemoveType>) {
      state.items = state.items.filter(obj => obj.price !== action.payload.price)
      state.totalPrice -= action.payload.price * action.payload.count
    },


    clearItems(state) {
        state.items = []
        state.totalPrice = 0

    }

    
  },
})


export const selectCart = (state: RootState) => state.cart
export const selectNewPrice = (state: RootState) => state.cart.price
export const selectCartItem = (par: ParType) => (state: RootState) => state.cart.items.find(obj => obj.id === par.id && obj.size === par.sizes[par.activeSizeIndex] && obj.type === par.typeNames[par.activeTypeIndex])

export const {addItem, removeItem, clearItems, minusItem, } = cartSlice.actions

export default cartSlice.reducer