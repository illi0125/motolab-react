import { Box, Container, Typography } from "@mui/material";

interface StatItem {
  value: string;
  unit?: string;
  plus?: boolean;
  label: string;
  description: string;
  color: string;
}

const statsData: StatItem[] = [
  {
    value: "12",
    unit: "UNITS",
    label: "SUPERBIKES",
    description: "Active high-performance telemetry test bench models.",
    color: "#06b6d4",
  },
  {
    value: "8",
    unit: "YRS",
    label: "LAB EXPERIENCE",
    description: "Deep telemetry & performance engineering research.",
    color: "#3b82f6",
  },
  {
    value: "50",
    plus: true,
    label: "FLEET LINEUP",
    description: "Production & track-ready racing configurations.",
    color: "#8b5cf6",
  },
  {
    value: "200",
    plus: true,
    label: "PRO CLIENTS",
    description: "World-class racers and racing teams supported globally.",
    color: "#10b981",
  },
];

export default function Statistics() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        bgcolor: "#05080f",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        background: `
          radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
          #05080f
        `,
      }}
    >
      {/* HUD Background Mesh Grid Lines */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* CSS GRID CONTAINER (NO OVERLOAD ERRORS) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {statsData.map((stat, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                height: "100%",
                bgcolor: "rgba(11, 17, 29, 0.6)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "20px",
                p: 3.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "default",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: `${stat.color}80`,
                  boxShadow: `0 15px 35px -10px ${stat.color}33`,
                  "& .stat-glow-bar": {
                    opacity: 1,
                    transform: "scaleX(1)",
                  },
                },
              }}
            >
              {/* Top Corner HUD Indicator */}
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: stat.color,
                    boxShadow: `0 0 8px ${stat.color}`,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    fontFamily: "monospace",
                    color: "rgba(255, 255, 255, 0.3)",
                    letterSpacing: "1px",
                  }}
                >
                  SYS_0{index + 1}
                </Typography>
              </Box>

              {/* Main Metric Value */}
              <Box sx={{ mt: 1, mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 0.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "2.8rem", md: "3.5rem" },
                      fontWeight: 900,
                      lineHeight: 1,
                      color: "#ffffff",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: "-1px",
                    }}
                  >
                    {stat.value}
                  </Typography>

                  {stat.plus && (
                    <Typography
                      sx={{
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: stat.color,
                        lineHeight: 1,
                      }}
                    >
                      +
                    </Typography>
                  )}

                  {stat.unit && (
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: stat.color,
                        letterSpacing: "1.5px",
                        fontFamily: "monospace",
                        ml: 0.5,
                      }}
                    >
                      {stat.unit}
                    </Typography>
                  )}
                </Box>

                {/* Label */}
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    color: "#e6edf3",
                    mt: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>

              {/* Description */}
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#9ca3af",
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                {stat.description}
              </Typography>

              {/* Bottom Glow Accent */}
              <Box
                className="stat-glow-bar"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  bgcolor: stat.color,
                  boxShadow: `0 0 12px ${stat.color}`,
                  opacity: 0,
                  transform: "scaleX(0.3)",
                  transition: "all 0.3s ease",
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
