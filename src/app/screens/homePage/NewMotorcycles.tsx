import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { Motorcycle } from "../../../lib/types/motorcycle";
import { serverApi } from "../../../lib/config";
import { MotorcycleCollection } from "../../../lib/enums/motorcycle.enum";
import { retrieveNewMotorcycles } from "./selector";

// ─── REDUX SLICE & SELECTOR ──────────────────────────
const newMotorcyclesRetriever = createSelector(
  retrieveNewMotorcycles,
  (newMotorcycles) => ({
    newMotorcycles,
  }),
);

export default function NewMotorcycles() {
  const { newMotorcycles } = useSelector(newMotorcyclesRetriever);
  console.log("newMotorcycles:", newMotorcycles);

  return (
    <div className="new-products-frame">
      <Container maxWidth="xl">
        <Stack className="main">
          {/* Section Header with Telemetry Badging */}
          <Box className="category-header-wrapper">
            <div className="category-badge-pill">
              <span className="pulse-dot" />
              <span>LATEST R&D RELEASES</span>
            </div>
            <Box className="category-title">
              BRAND-NEW <span className="highlight-cyan">MOTORCYCLES</span>
            </Box>
          </Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {Array.isArray(newMotorcycles) && newMotorcycles.length > 0 ? (
                newMotorcycles.map((product: Motorcycle) => {
                  const imagePath = `${serverApi}/${product.motorcycleImages[0]}`;
                  const sizeVolume =
                    product.motorcycleCollection ===
                    MotorcycleCollection.CRUISER
                      ? product.motorcycleVolume + "cc"
                      : product.motorcycleSize + " bike";

                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className="card cyber-new-card"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%", // Ensures all cards match grid row height
                        justifyContent: "space-between",
                      }}
                    >
                      <CardOverflow className="card-image-wrapper">
                        <div className="product-sale">{sizeVolume}</div>
                        <AspectRatio ratio="4/3">
                          <img
                            src={imagePath}
                            alt={product.motorcycleName}
                            loading="lazy"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow
                        variant="soft"
                        className="product-detail"
                        sx={{
                          flexGrow: 1, // Stretches detail box to fill remaining height
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Stack
                          className="info"
                          spacing={1}
                          sx={{
                            height: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                          >
                            <Typography
                              level="title-md"
                              className="title"
                              sx={{
                                color: "#ffffff",
                                fontWeight: 700,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap", // Prevents long titles from pushing card height
                                maxWidth: "160px",
                              }}
                            >
                              {product.motorcycleName}
                            </Typography>
                            <Divider
                              width="2"
                              height="20"
                              bg="rgba(255, 255, 255, 0.15)"
                            />
                            <Typography
                              level="title-md"
                              className="price"
                              sx={{
                                color: "#06b6d4",
                                fontWeight: 800,
                                whiteSpace: "nowrap",
                              }}
                            >
                              ${product.motorcyclePrice}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <Typography
                              level="body-xs"
                              className="views"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "#8a8f9e",
                                fontWeight: 600,
                              }}
                            >
                              {product.motorcycleViews}
                              <VisibilityIcon
                                sx={{
                                  fontSize: 18,
                                  marginLeft: "5px",
                                  color: "#06b6d4",
                                }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">
                  Brand New motorcycles are not available!
                </Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
