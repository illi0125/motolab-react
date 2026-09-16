import { createSlice } from "@reduxjs/toolkit";
import type { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularMotorcycles: [],
  newMotorcycles: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularMotorcycles: (state, action) => {
      state.popularMotorcycles = action.payload;
    },
    setNewMotorcycles: (state, action) => {
      state.newMotorcycles = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setPopularMotorcycles, setNewMotorcycles, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
