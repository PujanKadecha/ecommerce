import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left Panel — Brand */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: { md: "45%", lg: "40%" },
          flexShrink: 0,
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f172a",
          backgroundImage: `
            radial-gradient(ellipse at 10% 90%, rgba(56,189,248,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 10%, rgba(139,92,246,0.1) 0%, transparent 55%)
          `,
          p: { md: 6, lg: 8 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative grid lines */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        {/* Brand Logo */}
        <Box sx={{ position: "relative" }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "#38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#0f172a",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  lineHeight: 1,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                E
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "1.1rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "Inter, sans-serif",
              }}
            >
              E-Commerce
            </Typography>
          </Box>
        </Box>

        {/* Center Content */}
        <Box sx={{ position: "relative" }}>
          <Typography
            sx={{
              color: "#38bdf8",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Premium Shopping
          </Typography>
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 800,
              fontSize: { md: "2rem", lg: "2.5rem" },
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              mb: 3,
            }}
          >
            Your curated
            <br />
            shopping
            <br />
            destination.
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.9rem",
              lineHeight: 1.8,
              maxWidth: 340,
            }}
          >
            Discover premium products, track your orders,
            and enjoy a seamless checkout experience.
          </Typography>
        </Box>

        {/* Bottom Quote */}
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              borderLeft: "2px solid #38bdf8",
              pl: 2,
              py: 0.5,
            }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.85rem",
                fontStyle: "italic",
                lineHeight: 1.6,
              }}
            >
              "Quality products, delivered with care."
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Panel — Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          p: { xs: 3, sm: 4, md: 6, lg: 8 },
          minHeight: { xs: "100vh", md: "auto" },
        }}
      >
        {/* Mobile-only brand */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "0.9rem",
                lineHeight: 1,
              }}
            >
              E
            </Typography>
          </Box>
          <Typography
            component={Link}
            to="/"
            sx={{
              color: "#111111",
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            E-Commerce
          </Typography>
        </Box>

        <Box sx={{ width: "100%", maxWidth: 420 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AuthLayout;
