import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrievePopularMotorcycles } from "./selector";
import type { Motorcycle } from "../../../lib/types/motorcycle";
import { serverApi } from "../../../lib/config";

// ─── REDUX SLICE & SELECTOR ──────────────────────────
const popularMotorcycleRetriever = createSelector(
  retrievePopularMotorcycles,
  (popularMotorcycles) => ({ popularMotorcycles }),
);

export default function PopularMotorcycles() {
  const { popularMotorcycles } = useSelector(popularMotorcycleRetriever);

  const hasDishes =
    Array.isArray(popularMotorcycles) && popularMotorcycles.length > 0;
  console.log("hasDishes:", hasDishes);

  return (
    <div className="popular-dishes-frame">
      <Container maxWidth="xl">
        <Stack className="popular-section">
          {/* Section Header with Telemetry Styling */}
          <Box className="category-header-wrapper">
            <div className="category-badge-pill">
              <span className="pulse-dot" />
              <span>MOST VIEWED MACHINES</span>
            </div>
            <Box className="category-title">
              POPULAR <span className="highlight-cyan">MOTORCYCLES</span>
            </Box>
          </Box>

          <Stack className="cards-frame">
            {popularMotorcycles?.length !== 0 ? (
              popularMotorcycles?.map((product: Motorcycle) => {
                const imagePath = `${serverApi}/${product.motorcycleImages[0]}`;

                return (
                  <CssVarsProvider key={product._id}>
                    <Card className="card cyber-card">
                      <CardCover className="image-cover">
                        <img
                          src={imagePath}
                          alt={product.motorcycleName}
                          loading="lazy"
                        />
                      </CardCover>
                      <CardCover className="card-cover overlay-gradient" />

                      {/* Views Badge Overlay */}
                      <div className="card-views-tag">
                        <VisibilityIcon
                          sx={{ fontSize: 16, color: "#06b6d4" }}
                        />
                        <span>{product.motorcycleViews}</span>
                      </div>

                      <CardContent
                        sx={{ justifyContent: "flex-end", zIndex: 2 }}
                      >
                        <Stack flexDirection="column" gap={0.5}>
                          <Typography
                            level="h2"
                            fontSize="xl"
                            textColor="#fff"
                            className="card-title-text"
                          >
                            {product.motorcycleName}
                          </Typography>
                        </Stack>
                      </CardContent>

                      <CardOverflow className="card-bottom-overflow">
                        <Typography
                          startDecorator={
                            <DescriptionOutlinedIcon
                              sx={{ color: "#06b6d4", fontSize: 18 }}
                            />
                          }
                          textColor="#8a8f9e"
                          className="card-desc-text"
                        >
                          {product.motorcycleDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">
                Popular motorcycles are not available!
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
