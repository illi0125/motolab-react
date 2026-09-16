import { configureStore } from "@reduxjs/toolkit";
import type { ThunkAction, Action } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import HomePageReducer from "./screens/homePage/slice";
import OrdersPageReducer from "./screens/ordersPage/slice";
import MotorcyclesPageReducer from "./screens/productsPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    // @ts-ignore
    getDefaultMiddleware().concat(createLogger()),
  reducer: {
    homePage: HomePageReducer,
    motorcyclesPage: MotorcyclesPageReducer,
    ordersPage: OrdersPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
