import axios from '../config/axiosConfig';

export const getSearchProduct = async name => {
  try {
    return await axios(`/products/search?term=${name}`);
  } catch (err) {
    console.log('error --> ', err);
  }
};

export const getProductByCategory = async url => {
  try {
    return await axios(url);
  } catch (error) {
    console.log(error);
  }
};
