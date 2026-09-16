// import React from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { type Dispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { setChosenMotorcycle, setAdmin } from "./slice";
import type { Motorcycle } from "../../../lib/types/motorcycle";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveChosenMotorcycle, retrieveAdmin } from "./selector";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import MemberService from "../../services/MemberService";
import type { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import type { CartItem } from "../../../lib/types/search";
import MotorcycleService from "../../services/MotorcycleService";

// ─── REDUX SLICE & SELECTOR ──────────────────────────
const actionDispatch = (dispatch: Dispatch) => ({
  setAdmin: (data: Member) => dispatch(setAdmin(data)),
  setChosenMotorcycle: (data: Motorcycle) =>
    dispatch(setChosenMotorcycle(data)),
});
const chosenMotorcycleRetriever = createSelector(
  retrieveChosenMotorcycle,
  (chosenMotorcycle) => ({
    chosenMotorcycle,
  }),
);
const adminRetriever = createSelector(retrieveAdmin, (admin) => ({
  admin,
}));

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenMotorcycle(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setAdmin, setChosenMotorcycle } = actionDispatch(useDispatch());
  const { chosenMotorcycle } = useSelector(chosenMotorcycleRetriever);
  const { admin } = useSelector(adminRetriever);

  useEffect(() => {
    const product = new MotorcycleService();
    product
      .getMotorcycle(productId)
      .then((data) => setChosenMotorcycle(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getAdmin()
      .then((data) => setAdmin(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenMotorcycle) return null;

  return (
    <div className="chosen-motorcycle-page">
      <Container maxWidth="xl" className="detail-container">
        {/* Top Breadcrumb / Page Title */}
        <Box className="detail-header">
          <span className="header-tag">MOTORCYCLE SPECIFICATION</span>
          <h1 className="header-title">{chosenMotorcycle.motorcycleName}</h1>
        </Box>

        {/* Main Content Layout */}
        <div className="detail-content-grid">
          {/* Left Column: Image Gallery Slider */}
          <div className="slider-wrapper">
            <Swiper
              loop={true}
              spaceBetween={16}
              navigation={true}
              modules={[FreeMode, Navigation]}
              className="motorcycle-swiper"
            >
              {chosenMotorcycle.motorcycleImages?.map(
                (ele: string, index: number) => {
                  const imagePath = `${serverApi}/${ele}`;
                  return (
                    <SwiperSlide key={index}>
                      <div className="image-slide-container">
                        <img
                          className="slide-img"
                          src={imagePath}
                          alt={`${chosenMotorcycle.motorcycleName} view ${index + 1}`}
                        />
                      </div>
                    </SwiperSlide>
                  );
                },
              )}
            </Swiper>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="info-card">
            {/* Title & Views */}
            <div className="info-card-header">
              <h2 className="bike-name">{chosenMotorcycle.motorcycleName}</h2>
              <div className="views-badge">
                <RemoveRedEyeIcon sx={{ fontSize: 16 }} />
                <span>{chosenMotorcycle.motorcycleViews} Views</span>
              </div>
            </div>

            {/* Rating Section */}
            <div className="rating-row">
              <Rating
                name="read-only-rating"
                defaultValue={4.5}
                precision={0.5}
                readOnly
                sx={{
                  color: "#06b6d4",
                  "& .MuiRating-iconEmpty": { color: "#334155" },
                }}
              />
              <span className="rating-score">4.5 / 5.0</span>
            </div>

            {/* Dealer Contact Badge */}
            {(admin?.memberNick || admin?.memberPhone) && (
              <div className="dealer-info-box">
                <div className="dealer-label">DEALER CONTACT</div>
                {admin?.memberNick && (
                  <div className="dealer-detail">Name: {admin.memberNick}</div>
                )}
                {admin?.memberPhone && (
                  <div className="dealer-detail">Tel: {admin.memberPhone}</div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="description-section">
              <span className="section-title">DESCRIPTION</span>
              <p className="description-text">
                {chosenMotorcycle.motorcycleDesc ||
                  "No detailed description provided for this vehicle."}
              </p>
            </div>

            <Divider height="1" width="100%" bg="rgba(255, 255, 255, 0.1)" />

            {/* Price & Action Row */}
            <div className="action-footer">
              <div className="price-container">
                <span className="price-label">PRICE</span>
                <span className="price-value">
                  ${chosenMotorcycle.motorcyclePrice?.toLocaleString()}
                </span>
              </div>

              <Button
                className="add-to-cart-btn"
                variant="contained"
                onClick={(e) => {
                  onAdd({
                    _id: chosenMotorcycle._id,
                    quantity: 1,
                    name: chosenMotorcycle.motorcycleName,
                    price: chosenMotorcycle.motorcyclePrice,
                    image: chosenMotorcycle.motorcycleImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                ADD TO BASKET
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
