import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (state, action) => {
      if (state.length) return;
      action.payload.forEach(item => state.push(item));
    },
  },
});

export const { addProducts } = productsSlice.actions;
export default productsSlice.reducer;
