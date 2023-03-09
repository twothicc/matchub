import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type User = {
  id: number
  fullName: string
  email: string
}

// Define a type for the slice state
interface LoginState {
  isLogin: boolean;
  user: User
};

// Define the initial state using that type
const initialState: LoginState = {
  isLogin: false,
  user: {
    id: -1,
    fullName: "",
    email: "",
  }
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
    },
    setUser: (state, action: PayloadAction<User>) => {
      // no need to copy because changing the entire user object.
      state.user = action.payload;
    }
  }
});

export const { login, logout, setUser } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login.isLogin;
export const selectUser = (state: RootState) => state.login.user;

export default loginSlice.reducer;