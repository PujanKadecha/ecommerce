import { Box, Button, Container, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "75vh", md: "85vh" },
        display: "flex",
        alignItems: "center",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWxWyc8N7enL-KaKdbJxxq2eVUt8Q1WC2K5IZkxGmqfZUfMGH7SofHSiQ&s')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#ffffff",
        mb: { xs: 8, md: 12 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 3, md: 8 },
          py: { xs: 8, md: 12 },
        }}
      >
        <Box sx={{ maxWidth: 680 }}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              mb: 2,
              color: "#e5e5e5",
              fontSize: { xs: "0.75rem", md: "0.85rem" },
            }}
          >
            Spring / Summer 2026 Collection
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              mb: 3,
            }}
          >
            Elevate Your Everyday Essentials.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.15rem" },
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.6,
              mb: 4,
              maxWidth: 520,
              fontWeight: 300,
            }}
          >
            Discover our meticulously curated collection of premium electronics, lifestyle accessories, and modern design goods.
          </Typography>

          <Button
            component={Link}
            to="/products"
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              backgroundColor: "#ffffff",
              color: "#000000",
              px: 4,
              py: 1.75,
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              "&:hover": {
                backgroundColor: "#e5e5e5",
                color: "#000000",
              },
            }}
          >
            Explore Shop
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroBanner;
