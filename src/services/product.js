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

export const getProductBySearching = async title => {
  if (!title) return;
  try {
    const { data } = await axios(`/products/search/${title}`);
    // console.log(data);
    return data;
  } catch (err) {
    console.log('error --> ', err);
  }
};
