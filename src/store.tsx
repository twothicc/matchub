import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./slices/loginSlice";
import pageReducer from "./slices/pageSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    page: pageReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;