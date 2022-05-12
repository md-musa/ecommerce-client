import { createSlice, current } from '@reduxjs/toolkit';

const initialState = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (state, action) => {
      if (state.length) return;
      action.payload.forEach(item => state.push(item));
    },
    removeProducts: (state, action) => {
      return 0;
    },
    updateProducts: (state, action) => {
      return null;
    },
  },
});

export const { addProducts, removeProducts, updateProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
