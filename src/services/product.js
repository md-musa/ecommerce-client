import axios from 'axios';

export const getBestSellingProducts = async () => {
  try {
    const { data } = await axios.get(`/products/bestSellingProducts`);
    console.log(data);
    return data;
  } catch (err) {
    console.error('Error', err.stack);
  }
};
