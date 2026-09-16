import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import type { Member } from "../../../lib/types/member";
import "../../../css/activeusers.css";

// ─── REDUX SLICE & SELECTOR ──────────────────────────
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="active-users-frame">
      <Container maxWidth="xl">
        <Stack className="main">
          {/* Section Header with Telemetry Badging */}
          <Box className="category-header-wrapper">
            <div className="category-badge-pill">
              <span className="pulse-dot" />
              <span>COMMUNITY TELEMETRY</span>
            </div>
            <Box className="category-title">
              ACTIVE <span className="highlight-cyan">RIDERS</span>
            </Box>
          </Box>

          <Stack className="cards-frame">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = member.memberImage
                    ? `${serverApi}/${member.memberImage}`
                    : "/icons/default-user.svg";

                  return (
                    <Card
                      key={member._id}
                      className="card cyber-user-card"
                      variant="outlined"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <CardOverflow className="user-image-wrapper">
                        {/* Live Telemetry Badge */}
                        <div className="user-status-tag">
                          <span className="online-dot"></span>
                          ONLINE
                        </div>
                        <AspectRatio ratio="1">
                          <img
                            src={imagePath}
                            loading="lazy"
                            alt={member.memberNick}
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
                        className="user-detail-overflow"
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          py: 1.5,
                        }}
                      >
                        <Typography
                          className="member-nickname"
                          level="title-md"
                          sx={{
                            color: "#ffffff",
                            fontWeight: 700,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          {member.memberNick}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
