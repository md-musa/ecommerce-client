import axios from 'axios';

export async function addItemToWishlist({ id }) {
  try {
    const { data } = await axios.post('/wishLists', { _id: id });
    return data;
  } catch (err) {
    console.log(err);
  }
}
export async function isExistItemInsideWishlist(id) {
  try {
    const { data } = await axios(`/wishLists/itemInWishlist/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
}
