import { createSelector } from "reselect";
import type { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrievePopularMotorcycles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularMotorcycles,
);

export const retrieveNewMotorcycles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newMotorcycles,
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers,
);
