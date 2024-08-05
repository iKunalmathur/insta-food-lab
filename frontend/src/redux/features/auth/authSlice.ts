import { T_User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type T_InitialState = {
  authUser: null | T_User;
  isLogin: boolean;
  accessToken: string | null;
};

const initialState: T_InitialState = {
  authUser: null,
  isLogin: false,
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload;

      if (action.payload) {
        localStorage.setItem('accessToken', action.payload);
      }
    },
  },
});

export const { setAuthUser, setIsLogin, setToken } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthUser = (state: { auth: T_InitialState }) => state.auth.authUser;
export const selectIsLogin = (state: { auth: T_InitialState }) => state.auth.isLogin;
export const selectToken = (state: { auth: T_InitialState }) => state.auth.accessToken;
