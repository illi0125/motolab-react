import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ShieldIcon from "@mui/icons-material/Shield";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Settings } from "./Settings";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import "../../../css/userPage.css";
import { useEffect } from "react";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  useEffect(() => {
    if (!authMember) {
      history.push("/");
    }
  }, [authMember, history]);

  // Don't render component UI if not logged in
  if (!authMember) return null;

  return (
    <div className={"user-page"}>
      <Container maxWidth="xl">
        <Stack className={"my-page-frame"}>
          {/* Main Content Area: Left Settings Panel */}
          <Stack className={"my-page-left"}>
            <Box display={"flex"} flexDirection={"column"} width="100%">
              <Box className={"menu-header"}>
                <div className={"category-badge-pill"}>
                  <span className={"pulse-dot"} />
                  <span>PILOT PROFILE</span>
                </div>
                <h2 className={"menu-name"}>
                  ACCOUNT <span className={"highlight-cyan"}>SETTINGS</span>
                </h2>
              </Box>

              <Box className={"menu-content"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          {/* Right Sidebar: Profile Badge & Socials */}
          <Stack className={"my-page-right"}>
            <Box className={"order-info-box"}>
              <Box className={"user-badge-header"}>
                <span className={"badge-tag"}>
                  SYSTEM ID #0{authMember?._id?.slice(-4) || "88"}
                </span>
              </Box>

              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                className={"profile-meta-center"}
              >
                <div className={"order-user-img"}>
                  <img
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    className={"order-user-avatar"}
                    alt={authMember?.memberNick || "User"}
                  />
                  <div className={"order-user-icon-box"}>
                    <img
                      src={
                        authMember?.memberType === MemberType.ADMIN
                          ? "/icons/restaurant.svg"
                          : "/icons/user-badge.svg"
                      }
                      alt="type-badge"
                    />
                  </div>
                </div>

                <span className={"order-user-name"}>
                  {authMember?.memberNick}
                </span>

                <div className={"user-role-pill"}>
                  <ShieldIcon sx={{ fontSize: 14, color: "#06b6d4" }} />
                  <span className={"order-user-prof"}>
                    {authMember?.memberType}
                  </span>
                </div>

                <div className={"user-location-row"}>
                  <LocationOnIcon sx={{ fontSize: 14, color: "#ef4444" }} />
                  <span className={"order-user-address"}>
                    {authMember?.memberAddress
                      ? authMember.memberAddress
                      : "No address provided"}
                  </span>
                </div>
              </Box>

              <div className={"user-divider"} />

              <p className={"user-desc"}>
                {authMember?.memberDesc
                  ? authMember.memberDesc
                  : "No bio description configured yet."}
              </p>

              <div className={"user-divider"} />

              <Box className={"user-media-box"}>
                <a href="#facebook" className={"sns-item"}>
                  <FacebookIcon />
                </a>
                <a href="#instagram" className={"sns-item"}>
                  <InstagramIcon />
                </a>
                <a href="#telegram" className={"sns-item"}>
                  <TelegramIcon />
                </a>
                <a href="#youtube" className={"sns-item"}>
                  <YouTubeIcon />
                </a>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
