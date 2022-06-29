import axios from 'axios';
import { toast } from 'react-toastify';

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

export async function getProductDetails(id) {
  try {
    const { data } = await axios.get(`/products/${id}`);
    window.scrollTo(0, 0);
    return data;
    // getProductByCategory(data.category);
  } catch (err) {
    console.log('Error=>', err);
  }
}

export const getRelatedProducts = async category => {
  try {
    const { data } = await axios.get(`products/categories/${category}`);
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
};

export async function getProductByCategory(url) {
  try {
    const { data } = await axios(url);
    return data;
  } catch (err) {
    console.log(err);
  }
}
