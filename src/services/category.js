import axios from 'axios';

export const getCategories = async id => {
  try {
    if (id) {
      const { data } = await axios.get(`/categories`);
      console.log(data);
      return data;
    }
    const { data } = await axios.get(`/categories?id=${id}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
