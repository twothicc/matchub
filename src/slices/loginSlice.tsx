import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type User = {
  id: number
  fullName: string
  email: string
}

const loginKey = process.env.REACT_APP_LOCALSTORAGE_ISLOGIN === undefined ? 
  "isLogin" : process.env.REACT_APP_LOCALSTORAGE_ISLOGIN

const userKey = process.env.REACT_APP_LOCALSTORAGE_USER === undefined ? 
  "user" : process.env.REACT_APP_LOCALSTORAGE_USER

// Define a type for the slice state
interface LoginState {
  isLogin: boolean;
  user: User
};

const getLocalStorageLoginState = ():boolean => {
  const value = localStorage.getItem(loginKey);
  return value === null ? false : JSON.parse(value);
}

const getLocalStorageUserState = ():User => {
  const value = localStorage.getItem(userKey);
  console.log(value)
  return value === null ? noLoginUser : JSON.parse(value);
}

const noLoginUser = {
  id: -1,
  fullName: "",
  email: "",
}

// Define the initial state using that type
const initialState: LoginState = {
  isLogin: getLocalStorageLoginState(),
  user: getLocalStorageUserState(),
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      localStorage.setItem(loginKey, "true");
      state.isLogin = true;
    },
    logout: (state) => {
      localStorage.setItem(loginKey, "false");
      localStorage.removeItem(userKey);
      state.isLogin = false;
    },
    setUser: (state, action: PayloadAction<User>) => {
      // no need to copy because changing the entire user object.
      state.user = action.payload;
      localStorage.setItem(userKey, JSON.stringify(state.user));
    }
  }
});

export const { login, logout, setUser } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login.isLogin;
export const selectUser = (state: RootState) => state.login.user;

export default loginSlice.reducer;