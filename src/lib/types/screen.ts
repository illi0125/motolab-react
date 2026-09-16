import type { Member } from "./member";
import type { Order } from "./order";
import type { Motorcycle } from "./motorcycle";

/*
╔════════════════════════════════════════════════════════╗
║                     REACT APP STATE                    ║
╚════════════════════════════════════════════════════════╝
*/

export interface AppRootState {
  homePage: HomePageState;
  motorcyclesPage: MotorcyclesPageState;
  ordersPage: OrdersPageState;
}

// ─── HOMEPAGE ─────────────────────────────────────────
export interface HomePageState {
  popularMotorcycles: Motorcycle[];
  newMotorcycles: Motorcycle[];
  topUsers: Member[];
}

// ─── MOTORCYCLES PAGE ──────────────────────────────────────
export interface MotorcyclesPageState {
  admin: Member | null;
  chosenMotorcycle: Motorcycle | null;
  motorcycles: Motorcycle[];
}

// ─── ORDERS PAGE ────────────────────────────────────────
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
