import { Box, Container, Stack, Typography } from "@mui/material";

interface LabFeature {
  code: string;
  title: string;
  description: string;
  accentColor: string;
}

const features: LabFeature[] = [
  {
    code: "TLM-01",
    title: "100Hz Real-Time Telemetry",
    description:
      "High-frequency sensor acquisition tracking lean angle, suspension travel, throttle position, and ECU diagnostics in real time.",
    accentColor: "#06b6d4",
  },
  {
    code: "TLM-02",
    title: "AI Predictive Dynamics",
    description:
      "Machine learning models analyzing tire wear, thermal dissipation, and optimal braking markers for precision track performance.",
    accentColor: "#3b82f6",
  },
  {
    code: "TLM-03",
    title: "Dyno & Wind Tunnel Testing",
    description:
      "In-house climate-controlled chassis dyno and aerodynamic simulation lab calibrating elite superbike configurations.",
    accentColor: "#8b5cf6",
  },
  {
    code: "TLM-04",
    title: "Cloud Telemetry Sync",
    description:
      "Instant encrypted sync from bike onboard units straight to pit-wall engineers and rider mobile dashboards.",
    accentColor: "#10b981",
  },
];

const stats = [
  { label: "R&D FACILITY SIZE", value: "25,000 SQFT" },
  { label: "SENSORS LOGGED / SEC", value: "50,000+" },
  { label: "TRACK TEST HOURS", value: "12,400 HRS" },
  { label: "ACCURACY TOLERANCE", value: "±0.001 SEC" },
];

export default function AboutPage() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#05080f",
        color: "#ffffff",
        minHeight: "100vh",
        pb: 12,
        pt: { xs: 4, md: 8 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Cyber Mesh */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      {/* Radial Glow Backdrops */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* ─── HERO HEADER ────────────────────────────────────────── */}
        <Stack spacing={2} sx={{ maxWidth: "800px", mb: 10 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              alignSelf: "flex-start",
              px: 2,
              py: 0.6,
              borderRadius: "100px",
              bgcolor: "rgba(6, 182, 212, 0.08)",
              border: "1px solid rgba(6, 182, 212, 0.25)",
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
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "#06b6d4",
                fontFamily: "monospace",
                letterSpacing: "1.5px",
              }}
            >
              MOTOLAB R&D DIVISION
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-1px",
              textTransform: "uppercase",
            }}
          >
            WHERE TELEMETRY MEETS{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              PURE SPEED
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "#9ca3af",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            MotoLab is a superbike research and development telemetry facility.
            We engineer raw track data into actionable telemetry insights,
            pushing the boundaries of superbike performance and rider precision.
          </Typography>
        </Stack>

        {/* ─── METRIC HIGHLIGHT STRIP ─────────────────────────────── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 12,
          }}
        >
          {stats.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                bgcolor: "rgba(11, 17, 29, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                p: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "#06b6d4",
                  fontFamily: "monospace",
                  letterSpacing: "1.5px",
                  mb: 1,
                }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#ffffff",
                }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ─── R&D CORE CAPABILITIES GRID ─────────────────────────── */}
        <Box sx={{ mb: 12 }}>
          <Stack spacing={1} sx={{ mb: 6 }}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 800,
                color: "#06b6d4",
                fontFamily: "monospace",
                letterSpacing: "2px",
              }}
            >
              SYSTEM ARCHITECTURE
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: 900,
              }}
            >
              LABORATORY CAPABILITIES
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
              gap: 3,
            }}
          >
            {features.map((feature, idx) => (
              <Box
                key={idx}
                sx={{
                  position: "relative",
                  bgcolor: "rgba(11, 17, 29, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "20px",
                  p: 4,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: `${feature.accentColor}80`,
                    boxShadow: `0 20px 40px -15px ${feature.accentColor}25`,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    fontFamily: "monospace",
                    color: feature.accentColor,
                    mb: 1.5,
                  }}
                >
                  // {feature.code}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    mb: 1.5,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "#9ca3af",
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ─── MISSION STATEMENT BANNER ────────────────────────────── */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "24px",
            p: { xs: 4, md: 8 },
            background:
              "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)",
            border: "1px solid rgba(6, 182, 212, 0.25)",
            backdropFilter: "blur(16px)",
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 800,
              color: "#06b6d4",
              fontFamily: "monospace",
              letterSpacing: "2px",
              mb: 2,
            }}
          >
            OUR MISSION
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1.4rem", md: "2.2rem" },
              fontWeight: 800,
              maxWidth: "900px",
              lineHeight: 1.3,
              color: "#ffffff",
            }}
          >
            "Democratizing factory-level telemetry and race-grade engineering
            for riders who demand perfection on every corner."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
