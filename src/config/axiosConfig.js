import axios from 'axios';
import store from '../config/storeConfig';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:5000/api',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

store.subscribe(() => {
  const user = store.getState().auth.user;

  if (user && user.token) {
    axiosConfig.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.token}`;
  }
});

export default axiosConfig;
