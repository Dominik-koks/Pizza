import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: 'rating' },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
        state.categoryId = action.payload
    },
    setSearchValue(state, action) {
        state.searchValue = action.payload
    },
    setSort(state, action) {
        state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
      state.sort = action.payload.sort
    }

    
  },
})

export const selectSort = state => state.filter.sort
export const selectFilter = state => state.filter

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer