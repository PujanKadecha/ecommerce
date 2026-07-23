import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import ProductGallery from "../../components/product/ProductGallery";
import api from "../../api/axios";
import ProductInfo from "../../components/product/ProductInfo";
import ProductTabs from "../../components/product/ProductTabs";
import RelatedProducts from "../../components/product/RelatedProducts";

function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);

        setProduct(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={5}>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <ProductGallery images={product.images} />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <ProductInfo product={product} />
        </Grid>
      </Grid>

      <ProductTabs product={product} />
      <RelatedProducts product={product} />
    </Container>
  );
}

export default ProductDetailsPage;
