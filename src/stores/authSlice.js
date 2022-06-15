const { createSlice } = require('@reduxjs/toolkit');

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    addUserInfo: (state, action) => {
      state.user = action.payload;
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
