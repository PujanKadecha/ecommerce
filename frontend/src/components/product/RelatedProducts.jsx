import { useEffect, useState } from "react";

import { Typography, Grid } from "@mui/material";

import api from "../../api/axios";
import ProductCard from "./ProductCard";

function RelatedProducts({ product }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!product) return;

    const loadProducts = async () => {
      try {
        const res = await api.get("/products");

        const related = res.data.data
          .filter(
            (item) =>
              item.category === product.category && item._id !== product._id,
          )
          .slice(0, 4);

        setProducts(related);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, [product]);

  if (products.length === 0) return null;

  return (
    <>
      <Typography variant="h4" fontWeight="bold" mt={8} mb={4}>
        Related Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((item) => (
          <Grid
            key={item._id}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <ProductCard product={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default RelatedProducts;
