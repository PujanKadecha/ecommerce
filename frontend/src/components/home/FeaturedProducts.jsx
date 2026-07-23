import { useEffect, useState } from "react";

import { Container, Typography, Grid } from "@mui/material";

import api from "../../api/axios";

import ProductCard from "../product/ProductCard";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/products");

        setProducts(res.data.data.slice(0, 8));
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Featured Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            key={product._id}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FeaturedProducts;
