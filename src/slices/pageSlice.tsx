import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface PageState {
  clubPage: number;
  appliedClubPage: number;
};

// Define the initial state using that type
const initialState: PageState = {
  clubPage: 0,
  appliedClubPage: 0,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setClubPage: (state, action: PayloadAction<number>) => {
      state.clubPage = action.payload
    },
    setAppliedClubPage: (state, action: PayloadAction<number>) => {
      state.appliedClubPage = action.payload
    }
  }
});

export const { setClubPage } = pageSlice.actions;

export const selectClubPage = (state: RootState) => state.page.clubPage;

export const selectAppliedClubPage = (state: RootState) => state.page.appliedClubPage;

export default pageSlice.reducer;