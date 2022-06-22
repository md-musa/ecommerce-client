import axios from 'axios';

export const addItemToCart = async ({ _id, price }) => {
  try {
    const { data } = await axios.post('/carts', {
      productId: _id,
      price,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getCartItems = async () => {
  try {
    return await axios('/carts');
  } catch (err) {
    console.log(err);
  }
};

export const removeItemFromCart = async id => {
  try {
    return await axios.delete(`/carts?id=${id}`);
  } catch (err) {
    console.log(err);
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
