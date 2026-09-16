import Statistics from "./Statistics";
import PopularMotorcycles from "./PopularMotorcycles";
import NewMotorcycles from "./NewMotorcycles";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useEffect } from "react";
import { type Dispatch } from "@reduxjs/toolkit";
import { setNewMotorcycles, setPopularMotorcycles, setTopUsers } from "./slice";
import type { Motorcycle } from "../../../lib/types/motorcycle";
import { useDispatch } from "react-redux";
// import { MotorcycleCollection } from "../../../lib/enums/motorcycle.enum";
import "../../../css/home.css";
import MemberService from "../../services/MemberService";
import type { Member } from "../../../lib/types/member";
import MotorcycleService from "../../services/MotorcycleService";

// ─── REDUX SLICE & SELECTOR ──────────────────────────
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularMotorcycles: (data: Motorcycle[]) =>
    dispatch(setPopularMotorcycles(data)),
  setNewMotorcycles: (data: Motorcycle[]) => dispatch(setNewMotorcycles(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularMotorcycles, setNewMotorcycles, setTopUsers } =
    actionDispatch(useDispatch());

  useEffect(() => {
    // Backend server date request => Data
    const product = new MotorcycleService();
    product
      .getMotorcycles({
        page: 1,
        limit: 4,
        order: "motorcycleViews",
        // motorcycleCollection: MotorcycleCollection.CRUISER,
      })
      .then((data) => setPopularMotorcycles(data))
      .catch((err) => console.log(err));

    product
      .getMotorcycles({
        page: 1,
        limit: 4,
        order: "createdAt",
        // motorcycleCollection: MotorcycleCollection.CRUISER,
      })
      .then((data) => setNewMotorcycles(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homepage">
      <Statistics />
      <PopularMotorcycles />
      <NewMotorcycles />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
