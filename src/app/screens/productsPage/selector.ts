import { createSelector } from "reselect";
import type { AppRootState } from "../../../lib/types/screen";

const selectMotorcyclesPage = (state: AppRootState) => state.motorcyclesPage;

export const retrieveAdmin = createSelector(
  selectMotorcyclesPage,
  (MotorcyclesPage) => MotorcyclesPage.admin,
);

export const retrieveChosenMotorcycle = createSelector(
  selectMotorcyclesPage,
  (MotorcyclesPage) => MotorcyclesPage.chosenMotorcycle,
);

export const retrieveMotorcycles = createSelector(
  selectMotorcyclesPage,
  (MotorcyclesPage) => MotorcyclesPage.motorcycles,
);
