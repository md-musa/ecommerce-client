import axios from 'axios';

export const signUpUser = async (name, email, password) => {
  try {
    return await axios.post('/users/register', {
      name,
      email,
      password,
    });
  } catch (err) {
    console.log(err);
  }
};

export const signIn = async (email, password) => {
  try {
    return await axios.post(`/users/login`, { email, password });
  } catch (err) {
    console.log(err);
  }
};
