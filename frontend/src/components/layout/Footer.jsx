import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#000000",
        color: "#ffffff",
        mt: "auto",
        pt: { xs: 8, md: 10 },
        pb: 4,
        borderTop: "1px solid #1a1a1a",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
        <Grid container spacing={{ xs: 5, md: 6 }}>
          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              E-Commerce
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#999999",
                lineHeight: 1.8,
                maxWidth: 320,
                fontSize: "0.85rem",
              }}
            >
              A modern, minimalist general-purpose e-commerce destination
              curated for high-quality everyday essentials and premium products.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "block",
                mb: 2.5,
                color: "#ffffff",
              }}
            >
              Navigation
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                component={RouterLink}
                to="/"
                sx={{
                  color: "#aaaaaa",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/products"
                sx={{
                  color: "#aaaaaa",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                Shop All
              </Link>
              <Link
                component={RouterLink}
                to="/categories"
                sx={{
                  color: "#aaaaaa",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                Categories
              </Link>
            </Box>
          </Grid>

          {/* Support
          <Grid item xs={6} md={2}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "block",
                mb: 2.5,
                color: "#ffffff",
              }}
            >
              Customer Care
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="#"
                sx={{
                  color: "#aaaaaa",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                Shipping Policy
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#aaaaaa",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                Returns & Exchanges
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#aaaaaa",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                Terms of Service
              </Link>
            </Box>
          </Grid> */}

          
        </Grid>

        <Divider
          sx={{
            my: 6,
            borderColor: "#1a1a1a",
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#666666", fontSize: "0.75rem" }}
          >
            © {new Date().getFullYear()} E-commerce STORE. ALL RIGHTS RESERVED.
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#666666", fontSize: "0.75rem" }}
          >
            CRAFTED WITH PRECISION
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
