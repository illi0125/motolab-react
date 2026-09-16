import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import type { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface OtherNavbarProps {
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

export default function OtherNavbar(props: OtherNavbarProps) {
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
        width: "100%",
        minHeight: { xs: "350px", md: "500px" },
        backgroundColor: "#05080f",
        color: "#ffffff",
        pt: 2.5,
        pb: 2.5,
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        background: `
          radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 70%),
          #05080f
        `,
      }}
    >
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
      <Container maxWidth="xl">
        {/* ─── GLASSMorphic NAVIGATION BAR ─────────────────────────────── */}
        <Box
          sx={{
            background: "rgba(11, 17, 29, 0.75)",
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
            {/* BRAND LOGO & LIVE STATUS BADGE */}
            <Stack direction="row" alignItems="center" spacing={2}>
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

              {/* Version Status Pill */}
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 0.4,
                  borderRadius: "100px",
                  bgcolor: "rgba(6, 182, 212, 0.08)",
                  border: "1px solid rgba(6, 182, 212, 0.2)",
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
                <Box
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    color: "#06b6d4",
                    fontFamily: "monospace",
                    letterSpacing: "0.5px",
                  }}
                >
                  v4.2 LIVE
                </Box>
              </Box>
            </Stack>

            {/* NAV LINKS & USER CONTROLS */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 2, md: 3 }}
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

              {/* Telemetry Status Indicator */}
              <Box
                sx={{
                  display: { xs: "none", lg: "flex" },
                  alignItems: "center",
                  gap: 1,
                  px: 1.8,
                  py: 0.6,
                  borderRadius: "100px",
                  bgcolor: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                }}
              >
                <Box sx={{ fontSize: "0.75rem" }}>⚡</Box>
                <Box
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    color: "#10b981",
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                  }}
                >
                  TELEMETRY ON
                </Box>
              </Box>

              {/* BASKET */}
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

              {/* LOGOUT DROPDOWN MENU */}
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
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
