import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import cartSlice from './cartSlice';
import productsReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartSlice,
    auth: authSlice,
  },
});
