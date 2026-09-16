import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { type Dispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { setMotorcycles } from "./slice";
import type {
  Motorcycle,
  MotorcycleInquiry,
} from "../../../lib/types/motorcycle";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveMotorcycles } from "./selector";
import { useEffect, useState, type ChangeEvent } from "react";
import { MotorcycleCollection } from "../../../lib/enums/motorcycle.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import type { CartItem } from "../../../lib/types/search";
import MotorcycleService from "../../services/MotorcycleService";

// ─── REDUX SLICE & SELECTOR ──────────────────────────
const actionDispatch = (dispatch: Dispatch) => ({
  setMotorcycles: (data: Motorcycle[]) => dispatch(setMotorcycles(data)),
});
const motorcyclesRetriever = createSelector(
  retrieveMotorcycles,
  (motorcycles) => ({
    motorcycles,
  }),
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Motorcycles(props: ProductsProps) {
  const { onAdd } = props;
  const { setMotorcycles } = actionDispatch(useDispatch());
  const { motorcycles } = useSelector(motorcyclesRetriever);
  const [motorcycleSearch, setMotorcycleSearch] = useState<MotorcycleInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    motorcycleCollection: MotorcycleCollection.TOURING,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new MotorcycleService();
    product
      .getMotorcycles(motorcycleSearch)
      .then((data) => setMotorcycles(data))
      .catch((err) => console.log(err));
  }, [motorcycleSearch]);

  useEffect(() => {
    if (searchText === "") {
      motorcycleSearch.search = "";
      setMotorcycleSearch({ ...motorcycleSearch });
    }
  }, [searchText]);

  /** HANDLERS */
  const searchCollectionHandler = (collection: MotorcycleCollection) => {
    motorcycleSearch.page = 1;
    motorcycleSearch.motorcycleCollection = collection;
    setMotorcycleSearch({ ...motorcycleSearch });
  };

  const searchOrderHandler = (order: string) => {
    motorcycleSearch.page = 1;
    motorcycleSearch.order = order;
    setMotorcycleSearch({ ...motorcycleSearch });
  };

  const searchProductHandler = () => {
    motorcycleSearch.search = searchText;
    setMotorcycleSearch({ ...motorcycleSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    motorcycleSearch.page = value;
    setMotorcycleSearch({ ...motorcycleSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/motorcycles/${id}`);
  };

  return (
    <div className="products">
      <Container maxWidth="xl" className="catalog-container">
        <Stack
          flexDirection="column"
          alignItems="center"
          className="catalog-stack"
        >
          {/* ─── SEARCH & FILTER CONTROL BOARD ───────────────────────────── */}
          <Box
            sx={{
              width: "100%",
              mb: 6,
              p: { xs: 3, md: 4 },
              bgcolor: "rgba(11, 17, 29, 0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background Gradient Glow Pill */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: "10%",
                width: "300px",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, #06b6d4, transparent)",
              }}
            />

            <Stack spacing={3}>
              {/* TOP ROW: BADGE & TITLE */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                spacing={2}
              >
                <Box>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      px: 1.5,
                      py: 0.4,
                      borderRadius: "100px",
                      bgcolor: "rgba(6, 182, 212, 0.08)",
                      border: "1px solid rgba(6, 182, 212, 0.25)",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#06b6d4",
                        boxShadow: "0 0 8px #06b6d4",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        color: "#06b6d4",
                        fontFamily: "monospace",
                        letterSpacing: "1.5px",
                      }}
                    >
                      LIVE FLEET INVENTORY
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: { xs: "1.8rem", md: "2.4rem" },
                      fontWeight: 900,
                      color: "#ffffff",
                      letterSpacing: "-0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    MotoLab <span style={{ color: "#06b6d4" }}>Lineup</span>
                  </Typography>
                </Box>

                {/* FILTER / SORT CONTROLS */}
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "#9ca3af",
                      fontFamily: "monospace",
                      letterSpacing: "1px",
                      mr: 0.5,
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    SORT BY:
                  </Typography>

                  <Box
                    sx={{
                      display: "inline-flex",
                      bgcolor: "rgba(5, 8, 15, 0.6)",
                      p: 0.6,
                      borderRadius: "14px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      gap: 0.5,
                    }}
                  >
                    {[
                      { label: "Newest", field: "createdAt" },
                      { label: "Price", field: "motorcyclePrice" },
                      { label: "Popularity", field: "motorcycleViews" },
                    ].map((tab) => {
                      const isActive = motorcycleSearch.order === tab.field;
                      return (
                        <Button
                          key={tab.field}
                          onClick={() => searchOrderHandler(tab.field)}
                          sx={{
                            px: 2.2,
                            py: 0.8,
                            borderRadius: "10px",
                            fontSize: "0.8rem",
                            fontWeight: isActive ? 800 : 600,
                            textTransform: "none",
                            fontFamily: "'JetBrains Mono', monospace",
                            transition: "all 0.2s ease",
                            color: isActive ? "#000000" : "#9ca3af",
                            bgcolor: isActive ? "#06b6d4" : "transparent",
                            boxShadow: isActive
                              ? "0 0 15px rgba(6, 182, 212, 0.4)"
                              : "none",
                            "&:hover": {
                              bgcolor: isActive
                                ? "#06b6d4"
                                : "rgba(255, 255, 255, 0.05)",
                              color: isActive ? "#000000" : "#ffffff",
                            },
                          }}
                        >
                          {tab.label}
                        </Button>
                      );
                    })}
                  </Box>
                </Stack>
              </Stack>

              {/* BOTTOM ROW: FUTURISTIC SEARCH BAR */}
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "rgba(5, 8, 15, 0.8)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  p: 0.8,
                  transition: "all 0.3s ease",
                  "&:focus-within": {
                    borderColor: "#06b6d4",
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.25)",
                  },
                }}
              >
                <InputBase
                  placeholder="Search by model, telemetry specs, power..."
                  defaultValue={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                  sx={{
                    ml: 2,
                    flex: 1,
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    "& input::placeholder": {
                      color: "#6b7280",
                      opacity: 1,
                    },
                  }}
                />

                <Button
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                  sx={{
                    background:
                      "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
                    color: "#ffffff",
                    px: 3.5,
                    py: 1.2,
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    boxShadow: "0 4px 15px rgba(6, 182, 212, 0.3)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(6, 182, 212, 0.5)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  Search
                </Button>
              </Box>
            </Stack>
          </Box>
          {/* Main Catalog Area */}
          <Stack className="catalog-main-layout">
            {/* Category Pills Bar */}
            <div className="categories-bar">
              {[
                { label: "Touring", value: MotorcycleCollection.TOURING },
                { label: "Cruiser", value: MotorcycleCollection.CRUISER },
                { label: "Sport", value: MotorcycleCollection.SPORT },
                { label: "Scooter", value: MotorcycleCollection.SCOOTER },
                { label: "Other", value: MotorcycleCollection.OTHER },
              ].map((cat) => (
                <Button
                  key={cat.label}
                  variant="contained"
                  className={`category-pill ${
                    motorcycleSearch.motorcycleCollection === cat.value
                      ? "active"
                      : ""
                  }`}
                  onClick={() => searchCollectionHandler(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Grid of Motorcycle Cards */}
            <div className="product-grid">
              {motorcycles.length !== 0 ? (
                motorcycles.map((product: Motorcycle) => {
                  const imagePath = `${serverApi}/${product.motorcycleImages[0]}`;
                  const sizeVolume =
                    product.motorcycleCollection ===
                    MotorcycleCollection.CRUISER
                      ? product.motorcycleVolume + "cc"
                      : product.motorcycleSize + " bike";

                  return (
                    <div
                      key={product._id}
                      className="bike-card"
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      {/* Image & Quick Action Overlay */}
                      <div
                        className="card-media"
                        style={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <span className="spec-badge">{sizeVolume}</span>

                        <div className="overlay-actions">
                          <Button
                            className="action-btn cart-btn"
                            onClick={(e) => {
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.motorcycleName,
                                price: product.motorcyclePrice,
                                image: product.motorcycleImages[0],
                              });
                              e.stopPropagation();
                            }}
                          >
                            <img
                              src="/icons/shopping-cart.svg"
                              alt="Add to cart"
                            />
                          </Button>

                          <div className="views-badge">
                            <Badge
                              badgeContent={product.motorcycleViews}
                              color="secondary"
                            >
                              <RemoveRedEyeIcon
                                sx={{
                                  fontSize: 18,
                                  color:
                                    product.motorcycleViews === 0
                                      ? "#64748b"
                                      : "#06b6d4",
                                }}
                              />
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Content Footer */}
                      <div className="card-info">
                        <h3 className="bike-title">{product.motorcycleName}</h3>
                        <div className="bike-price-tag">
                          <MonetizationOnIcon
                            sx={{ fontSize: 18, color: "#06b6d4" }}
                          />
                          <span>
                            ${product.motorcyclePrice?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Box className="no-data-card">
                  <h3>No Motorcycles Found</h3>
                  <p>Try adjusting your search query or filters.</p>
                </Box>
              )}
            </div>
          </Stack>
          {/* Pagination Section */}
          <Box className="pagination-wrapper">
            <Pagination
              count={
                motorcycles.length !== 0
                  ? motorcycleSearch.page + 1
                  : motorcycleSearch.page
              }
              page={motorcycleSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
              onChange={paginationHandler}
            />
          </Box>
        </Stack>
      </Container>

      <div className="brands-section">
        <Container maxWidth="xl" className="brands-container">
          <div className="brands-header">
            <span className="brands-badge">PARTNERSHIPS</span>
            <h2 className="brands-title">Our Featured Brands</h2>
            <p className="brands-subtitle">
              We collaborate with leading global manufacturers to deliver
              top-tier performance.
            </p>
          </div>

          <Stack direction="row" className="brands-grid">
            <Box className="brand-card">
              <div className="brand-img-wrapper">
                <img src="/img/brand4.jpeg" alt="Brand Partner 1" />
              </div>
            </Box>

            <Box className="brand-card">
              <div className="brand-img-wrapper">
                <img src="/img/brand2.jpeg" alt="Brand Partner 2" />
              </div>
            </Box>

            <Box className="brand-card">
              <div className="brand-img-wrapper">
                <img src="/img/brand3.jpeg" alt="Brand Partner 3" />
              </div>
            </Box>

            <Box className="brand-card">
              <div className="brand-img-wrapper">
                <img src="/img/brand4.jpeg" alt="Brand Partner 4" />
              </div>
            </Box>
          </Stack>
        </Container>
      </div>

      <div className="ads-restaurant-frame">
        <video
          className="ads-video"
          autoPlay={true}
          loop
          muted
          playsInline
          data-video-media=""
        >
          <source type="video/mp4" src="video/motorcycle.mp4" />
        </video>
      </div>

      <div className="address-section">
        <Container maxWidth="xl" className="address-container">
          {/* Section Header */}
          <div className="address-header">
            <span className="address-badge">LOCATION & VISIT</span>
            <h2 className="address-title">Visit Our Showroom</h2>
            <p className="address-subtitle">
              Drop by our official dealership to check out our latest fleet and
              speak with our specialists.
            </p>
          </div>

          {/* Map & Info Card Layout */}
          <div className="address-content">
            {/* Google Map Frame */}
            <div className="map-wrapper">
              <iframe
                title="Showroom Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617539678126!2d-73.9878583!3d40.7484405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1625150000000!5m2!1sen!2sus"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
