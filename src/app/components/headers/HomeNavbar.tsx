import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  ListItemIcon,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import type { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "85vh", md: "100vh" },
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#05080f",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ─── BACKGROUND VIDEO LAYER WITH DUAL TINT OVERLAY ─────────── */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          opacity: 0.55,
          filter: "contrast(1.15) brightness(0.9)",
        }}
      >
        <source src="/video/motorcycle.mp4" type="video/mp4" />
      </Box>

      {/* Cyber Grid Pattern & Radial Vignette */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `
            radial-gradient(circle at 50% 30%, rgba(6, 182, 212, 0.12) 0%, transparent 70%),
            linear-gradient(180deg, rgba(5, 8, 15, 0.7) 0%, rgba(5, 8, 15, 0.4) 50%, #05080f 100%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* ─── MAIN CONTENT CONTAINER ─────────────────────────────────── */}
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          pt: 3,
          pb: 6,
        }}
      >
        {/* ─── GLASSMorphic TOP NAVIGATION BAR ───────────────────────── */}
        <Box
          sx={{
            background: "rgba(11, 17, 29, 0.65)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
            px: { xs: 2.5, md: 4 },
            py: 1.8,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* BRAND LOGO */}
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
                    fontWeight: 900,
                    fontSize: "1.2rem",
                    color: "#000",
                    fontFamily: "monospace",
                  }}
                >
                  M
                </Box>
                <Box>
                  <Box
                    sx={{
                      fontSize: "1.35rem",
                      fontWeight: 900,
                      letterSpacing: "1px",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    MOTO<span style={{ color: "#06b6d4" }}>LAB</span>
                  </Box>
                  <Box
                    sx={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "2.5px",
                      color: "rgba(255, 255, 255, 0.5)",
                      mt: 0.4,
                      fontFamily: "monospace",
                    }}
                  >
                    R&D TELEMETRY
                  </Box>
                </Box>
              </Stack>
            </NavLink>

            {/* NAV LINKS & USER CONTROLS */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 2, md: 3.5 }}
            >
              <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {[
                  { title: "Home", to: "/", exact: true },
                  { title: "Motorcycles", to: "/motorcycles" },
                  { title: "About", to: "/about" },
                  ...(authMember ? [{ title: "Orders", to: "/orders" }] : []),
                  ...(authMember
                    ? [{ title: "My Page", to: "/member-page" }]
                    : []),
                  { title: "Help", to: "/help" },
                ].map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    exact={link.exact}
                    activeClassName="underline"
                    style={{
                      textDecoration: "none",
                      color: "#9ca3af",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Box
                      sx={{
                        "&:hover": { color: "#06b6d4" },
                        "&.underline": { color: "#06b6d4", fontWeight: 700 },
                      }}
                    >
                      {link.title}
                    </Box>
                  </NavLink>
                ))}
              </Stack>

              {/* BASKET COMPONENT */}
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "12px",
                  p: 0.5,
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <Basket
                  cartItems={cartItems}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onDelete={onDelete}
                  onDeleteAll={onDeleteAll}
                />
              </Box>

              {/* AUTH ACTIONS */}
              {!authMember ? (
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setLoginOpen(true);
                  }}
                  sx={{
                    background: "rgba(6, 182, 212, 0.12)",
                    color: "#06b6d4",
                    border: "1px solid rgba(6, 182, 212, 0.4)",
                    borderRadius: "12px",
                    px: 3,
                    py: 1,
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 0 15px rgba(6, 182, 212, 0.15)",
                    "&:hover": {
                      background: "#06b6d4",
                      color: "#000000",
                      boxShadow: "0 0 25px rgba(6, 182, 212, 0.5)",
                    },
                  }}
                >
                  Login
                </Button>
              ) : (
                <Box
                  onClick={handleLogoutClick}
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      inset: -3,
                      borderRadius: "50%",
                      padding: "2px",
                      background:
                        "linear-gradient(135deg, #06b6d4, transparent)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember?.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    alt="User Avatar"
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              )}

              {/* LOGOUT MENU */}
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleCloseLogout}
                onClick={handleCloseLogout}
                transitionDuration={200}
                disableAutoFocusItem
                disableRestoreFocus
                disableEnforceFocus
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    bgcolor: "#0b0f17",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "16px",
                    color: "#e6edf3",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                    mt: 1.5,
                    "& .MuiMenuItem-root": {
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      fontFamily: "'JetBrains Mono', monospace",
                      py: 1.2,
                      px: 2.5,
                      borderRadius: "8px",
                      mx: 0.5,
                      "&:hover": {
                        bgcolor: "rgba(239, 68, 68, 0.15)",
                        color: "#ef4444",
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                    handleCloseLogout();
                    setTimeout(() => {
                      handleLogoutRequest();
                    }, 0);
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "#ef4444" }} />
                  </ListItemIcon>
                  Terminated Session (Logout)
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Box>

        {/* ─── HERO CONTENT CENTERPIECE ──────────────────────────────── */}
        <Stack
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            maxWidth: "850px",
            pt: { xs: 6, md: 10 },
          }}
          spacing={3}
        >
          {/* Telemetry Pill Indicator */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              alignSelf: "flex-start",
              px: 2.2,
              py: 0.8,
              borderRadius: "100px",
              background: "rgba(6, 182, 212, 0.08)",
              border: "1px solid rgba(6, 182, 212, 0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#06b6d4",
                boxShadow: "0 0 10px #06b6d4",
              }}
            />
            <Box
              sx={{
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "1.5px",
                color: "#06b6d4",
                fontFamily: "monospace",
              }}
            >
              SUPERBIKE TELEMETRY PLATFORM
            </Box>
          </Box>

          {/* Main Hero Typography */}
          <Box
            sx={{
              fontSize: { xs: "2.8rem", sm: "3.8rem", md: "5rem" },
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-1px",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            WORLD'S FINEST{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MOTOLAB
            </Box>{" "}
            SYSTEM
          </Box>

          {/* Subtitle */}
          <Box
            sx={{
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              color: "#9ca3af",
              fontWeight: 400,
            }}
          >
            The Choice, Not Just A Choice.
          </Box>

          {/* Service Status Badge */}
          <Box
            sx={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "#38bdf8",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontFamily: "monospace",
            }}
          >
            ⚡ 24/7 ACTIVE TELEMETRY SERVICE
          </Box>

          {/* Call To Action Button */}
          {!authMember && (
            <Box sx={{ pt: 2 }}>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.currentTarget.blur();
                  setSignupOpen(true);
                }}
                sx={{
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
                  color: "#ffffff",
                  px: 4.5,
                  py: 1.8,
                  borderRadius: "14px",
                  fontSize: "1rem",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  boxShadow: "0 10px 30px rgba(6, 182, 212, 0.35)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 40px rgba(6, 182, 212, 0.5)",
                  },
                }}
              >
                START SESSION
              </Button>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
