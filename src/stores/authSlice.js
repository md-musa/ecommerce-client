import axios from 'axios';

const { createSlice } = require('@reduxjs/toolkit');

const user = JSON.parse(localStorage.getItem('user'));
console.log('user-->', user);

const initialState = {
  user: user || null,
};

const authSlice = createSlice({
  name: 'user..',
  initialState,

  reducers: {
    addUserInfo: (state, action) => {
      state.user = action.payload;

      // Setting the token in the header of the axios
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.token}`;

      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    removeUserInfo: (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});
export const { addUserInfo, removeUserInfo } = authSlice.actions;
export default authSlice.reducer;
