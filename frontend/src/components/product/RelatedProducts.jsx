import { useEffect, useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import api from "../../api/axios";
import ProductCard from "./ProductCard";

function RelatedProducts({ product }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!product) return;

    const loadProducts = async () => {
      try {
        const res = await api.get("/products");

        const prodCat =
          typeof product.category === "object"
            ? product.category?._id
            : product.category;

        const related = res.data.data
          .filter((item) => {
            const itemCat =
              typeof item.category === "object"
                ? item.category?._id
                : item.category;
            return itemCat === prodCat && item._id !== product._id;
          })
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
    <Box sx={{ mt: 12, mb: 8 }}>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#666666",
          mb: 1,
          fontSize: "0.75rem",
        }}
      >
        Complete The Look
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          mb: 5,
        }}
      >
        Related Products
      </Typography>

      <Grid container spacing={{ xs: 2.5, md: 4 }}>
        {products.map((item) => (
          <Grid key={item._id} item xs={6} sm={6} md={3}>
            <ProductCard product={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RelatedProducts;
