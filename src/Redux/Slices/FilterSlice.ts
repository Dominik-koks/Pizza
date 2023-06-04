import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../Store'


export type SortItem = {
  name: string
  sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title'
}


export type FilterSliceState = {
  searchValue: string
  categoryId: number
  currentPage: number
  sort: SortItem
}



const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: 'rating' },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
        state.categoryId = action.payload
    },
    setSearchValue(state, action:PayloadAction<string>) {
        state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<SortItem>) {
        state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
      state.sort = action.payload.sort
    }

    
  },
})

export const selectSort = (state: RootState) => state.filter.sort
export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer