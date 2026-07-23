import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../store/slices/product.slice";
import ProductGallery from "../../components/product/ProductGallery";
import ProductInfo from "../../components/product/ProductInfo";
import ProductTabs from "../../components/product/ProductTabs";
import RelatedProducts from "../../components/product/RelatedProducts";

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product || {});

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          py: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#000000" }} />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="xl" sx={{ py: 15, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          PRODUCT NOT FOUND
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The requested product could not be located.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 }, py: { xs: 4, md: 8 } }}>
      <Grid container spacing={{ xs: 4, md: 8 }}>
        <Grid item xs={12} md={7}>
          <ProductGallery images={product.images} />
        </Grid>

        <Grid item xs={12} md={5}>
          <ProductInfo product={product} />
        </Grid>
      </Grid>

      <ProductTabs product={product} />
      <RelatedProducts product={product} />
    </Container>
  );
}

export default ProductDetailsPage;
