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
        const fetchedProducts = res.data?.data || [];
        setProducts(fetchedProducts.slice(0, 8));
      } catch (err) {
        console.error(err);
      }
    };
    loadProducts();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        mb={6}
        textTransform="uppercase"
      >
        Products
      </Typography>
      <Grid container spacing={4}>
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
