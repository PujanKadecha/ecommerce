import { useEffect } from "react";
import { Container, Typography, Grid, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/product.slice";
import ProductCard from "../product/ProductCard";

function FeaturedProducts() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product || {});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featured = (products || []).slice(0, 8);

  return (
    <Container
      maxWidth="xl"
      sx={{
        px: { xs: 3, md: 8 },
        mb: { xs: 12, md: 16 },
      }}
    >
      <Box sx={{ mb: 6, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#666666",
            mb: 1,
            fontSize: "0.75rem",
          }}
        >
          Selected Arrivals
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            fontSize: { xs: "1.75rem", md: "2.25rem" },
          }}
        >
          Featured Products
        </Typography>
      </Box>

      {loading && (products || []).length === 0 ? (
        <Box sx={{ py: 8, textAlign: "center" }}>
          <CircularProgress sx={{ color: "#000000" }} />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2.5, md: 4 }}>
          {featured.map((product) => (
            <Grid key={product._id} item xs={6} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default FeaturedProducts;
