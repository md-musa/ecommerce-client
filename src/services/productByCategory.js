import axios from './axiosConfig';

const getProductByCategory = async categoryName => {
  try {
    const { data } = await axios.get(`products/category/${categoryName}`);
    return data.products;
  } catch (error) {
    console.log(error);
  }
};

export { getProductByCategory };
