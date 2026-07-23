import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1e293b",
        color: "white",
        mt: "auto",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              E-Commerce
            </Typography>

            <Typography
              variant="body2"
              color="grey.400"
            >
              Your one-stop destination for quality
              products at affordable prices.
            </Typography>
          </Grid>

          {/* Quick Links */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Quick Links
            </Typography>

            <Link component={RouterLink} to="/" underline="hover" color="inherit" display="block">
              Home
            </Link>

            <Link component={RouterLink} to="/products" underline="hover" color="inherit" display="block">
              Products
            </Link>

            <Link component={RouterLink} to="/categories" underline="hover" color="inherit" display="block">
              Categories
            </Link>
          </Grid>

          {/* Contact */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Contact
            </Typography>

            <Typography variant="body2">
              support@ecommerce.com
            </Typography>

            <Typography variant="body2">
              +91 9876543210
            </Typography>

            <Typography variant="body2">
              Rajkot, Gujarat
            </Typography>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            borderColor: "grey.700",
          }}
        />

        <Typography
          textAlign="center"
          variant="body2"
          color="grey.500"
        >
          © {new Date().getFullYear()} E-Commerce. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;