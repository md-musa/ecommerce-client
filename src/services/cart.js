import axios from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

// const { isLoading, data: cart } = console.log('CART==> ', cart);

export const getCartItems = function getCartItems() {
  return useQuery('cart', async () => {
    try {
      const { data } = await axios.get('/carts');

      return data;
    } catch (err) {
      console.error(err);
    }
  });
};

export const addItemToCart = async ({ _id, price }) => {
  try {
    const { data } = await axios.post('/carts', {
      productId: _id,
      price,
    });
    if (data) {
      toast.success('Product added to cart!', {
        position: 'top-right',
      });
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const removeItemFromCart = async id => {
  try {
    return await axios.delete(`/carts?id=${id}`);
  } catch (err) {
    console.error(err);
  }
};

export const updateQuantity = async ({ _id, operation }) => {
  console.log(_id, operation);
  try {
    return await axios.patch(
      `/carts/updateQuantity?id=${_id}&operation=${operation}`
    );
  } catch (err) {
    console.log(err);
  }
};
