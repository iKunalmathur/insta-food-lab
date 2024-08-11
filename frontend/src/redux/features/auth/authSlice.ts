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
    setTokenWithExpiry: (state, action) => {
      const { access_token, expires_in } = action.payload;
      state.accessToken = access_token;
      localStorage.setItem('accessToken', access_token);
      const accessTokenExpiry = new Date().getTime() + expires_in * 1000;
      localStorage.setItem('accessTokenExpiry', accessTokenExpiry.toString());
    },
  },
});

export const { setAuthUser, setIsLogin, setToken ,setTokenWithExpiry} = authSlice.actions;
export default authSlice.reducer;

export const selectAuthUser = (state: { auth: T_InitialState }) => state.auth.authUser;
export const selectIsLogin = (state: { auth: T_InitialState }) => state.auth.isLogin;
export const getStoreToken = (state: { auth: T_InitialState }) => {
  const token = localStorage.getItem('accessToken');
  const tokenExpiry = localStorage.getItem('accessTokenExpiry');
  if (token && tokenExpiry && Number(tokenExpiry) > new Date().getTime()) {
    return state.auth.accessToken || token;
  }
  return null;
}
