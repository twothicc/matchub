import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface LoginState {
  isLogin: boolean;
};

// Define the initial state using that type
const initialState: LoginState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    }
  }
});

export const { login, logout } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login.isLogin;

export default loginSlice.reducer;