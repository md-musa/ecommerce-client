import { createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const quantity = newItem.quantity || 1;

      const isAlreadyInCart = state.products.filter(
        item => item.id == newItem.id
      );

      if (isAlreadyInCart.length == 0) {
        state.products.push({ ...newItem, quantity });
        toast.success('Item added to cart', {
          autoClose: 1000,
        });
      } else toast.info('This item already in the cart');
    },

    removeItem: (state, action) => {
      const remainingItems = state.products.filter(
        item => item.id != action.payload.id
      );
      state.products = remainingItems;
    },

    increaseQuantity: ({ products }, action) => {
      const itemIndex = products.findIndex(item => item.id == action.payload);

      products[itemIndex].quantity++;
    },

    decreaseQuantity: ({ products }, action) => {
      const itemIndex = products.findIndex(item => item.id == action.payload);
      if (products[itemIndex].quantity > 1) products[itemIndex].quantity--;
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
