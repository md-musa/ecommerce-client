import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../stores/authSlice';
import cartSlice from '../stores/cartSlice';
import productsReducer from '../stores/productsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartSlice,
    auth: authSlice,
  },
});

export default store;
