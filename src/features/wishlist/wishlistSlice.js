import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id)
      if (!exists) {
        state.items.push({ ...action.payload })
        state.totalQuantity += 1
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload
      const exists = state.items.find(item => item.id === id)
      if (exists) {
        state.items = state.items.filter(item => item.id !== id)
        state.totalQuantity -= 1
      }
    },
    clearWishlist: (state) => {
      state.items = []
      state.totalQuantity = 0
    }
  }
})

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer





