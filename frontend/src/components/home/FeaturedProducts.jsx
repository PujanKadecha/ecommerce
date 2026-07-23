import { useEffect, useState } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import api from "../../api/axios";
import ProductCard from "../product/ProductCard";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/products");
        const fetchedProducts = res.data?.data || [];
        setProducts(fetchedProducts.slice(0, 8));
      } catch (err) {
        console.error(err);
      }
    };
    loadProducts();
  }, []);

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

      <Grid container spacing={{ xs: 2.5, md: 4 }}>
        {products.map((product) => (
          <Grid key={product._id} item xs={6} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FeaturedProducts;
