import { createSlice } from "@reduxjs/toolkit";
import type { MotorcyclesPageState } from "../../../lib/types/screen";

const initialState: MotorcyclesPageState = {
  admin: null,
  chosenMotorcycle: null,
  motorcycles: [],
};

const motorcyclesPageSlice = createSlice({
  name: "motorcyclesPage",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setChosenMotorcycle: (state, action) => {
      state.chosenMotorcycle = action.payload;
    },
    setMotorcycles: (state, action) => {
      state.motorcycles = action.payload;
    },
  },
});

export const { setAdmin, setChosenMotorcycle, setMotorcycles } =
  motorcyclesPageSlice.actions;

const MotorcyclesPageReducer = motorcyclesPageSlice.reducer;
export default MotorcyclesPageReducer;