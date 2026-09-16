import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  const authMember = null;

  return (
    <footer className="footer-frame">
      <Container maxWidth="xl">
        <Stack className="footer-main-content">
          {/* Brand & Mission Column */}
          <Stack className="footer-brand-col">
            <Box className="footer-logo-box">
              <span className="logo-text">
                MOTO<span className="highlight-cyan">LAB</span>
              </span>
            </Box>
            <Box className="foot-desc-txt">
              Engineered for passion, performance, and precision. MotoLab
              connects motorcycle enthusiasts with cutting-edge machines, custom
              tuning telemetry, and an active rider community worldwide.
            </Box>
            <Box className="sns-context">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="sns-link"
              >
                <FacebookIcon sx={{ fontSize: 18 }} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="sns-link"
              >
                <TwitterIcon sx={{ fontSize: 18 }} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="sns-link"
              >
                <InstagramIcon sx={{ fontSize: 18 }} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="sns-link"
              >
                <YouTubeIcon sx={{ fontSize: 18 }} />
              </a>
            </Box>
          </Stack>

          {/* Navigation Links Column */}
          <Stack className="footer-nav-col">
            <Box className="foot-category-title">
              <span className="title-bar" /> NAVIGATION
            </Box>
            <Box className="foot-category-link">
              <Link to="/">Home</Link>
              <Link to="/motorcycles">Products</Link>
              {authMember && <Link to="/orders">Orders</Link>}
              <Link to="/help">Help & Support</Link>
            </Box>
          </Stack>

          {/* Contact / Telemetry Info Column */}
          <Stack className="footer-contact-col">
            <Box className="foot-category-title">
              <span className="title-bar" /> HEADQUARTERS
            </Box>
            <Box className="find-us-container">
              <Box className="find-us-item">
                <LocationOnIcon className="find-us-icon" />
                <div>Downtown, Dubai, UAE</div>
              </Box>
              <Box className="find-us-item">
                <PhoneIcon className="find-us-icon" />
                <div>+971 4 554 7777</div>
              </Box>
              <Box className="find-us-item">
                <EmailIcon className="find-us-icon" />
                <div>support@motolab.com</div>
              </Box>
              <Box className="find-us-item">
                <AccessTimeIcon className="find-us-icon" />
                <div>24/7 Telemetry Support</div>
              </Box>
            </Box>
          </Stack>
        </Stack>

        {/* Divider */}
        <Box className="footer-divider" />

        {/* Copyright Footer Bar */}
        <Stack className="copyright-row">
          <Box className="copyright-txt">
            © {new Date().getFullYear()} MotoLab Global Inc. All rights
            reserved.
          </Box>
          <Box className="footer-status-pill">
            <span className="status-dot" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </Box>
        </Stack>
      </Container>
    </footer>
  );
}
