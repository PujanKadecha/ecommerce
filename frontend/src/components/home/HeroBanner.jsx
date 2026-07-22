import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";

function HeroBanner() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
        color: "white",
        py: {
          xs: 6,
          md: 10,
        },
        borderRadius: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              BIG SALE
            </Typography>

            <Typography variant="h4" gutterBottom>
              Up To 50% OFF
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
              }}
            >
              Discover premium products at amazing prices.
            </Typography>

            <Button
              variant="contained"
              size="large"
              color="secondary"
              startIcon={<ShoppingBag />}
            >
              Shop Now
            </Button>
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src="https://placehold.co/500x350/png?text=Hero+Image"
              alt="Hero Banner"
              sx={{
                width: "100%",
                maxWidth: 500,
                borderRadius: 3,
                boxShadow: 6,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroBanner;
