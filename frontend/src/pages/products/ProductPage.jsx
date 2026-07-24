import { useEffect } from "react";
import { Container, Typography, Grid, Box, Chip, Stack, CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/product.slice";
import ProductCard from "../../components/product/ProductCard";

function ProductPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product || {});
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  let filteredProducts = products || [];

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter((p) => {
      const categoryName = typeof p.category === 'string' ? p.category : p.category?.name;
      return categoryName?.toLowerCase() === selectedCategory.toLowerCase();
    });
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 10 } }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#666666",
            display: "block",
            mb: 1,
          }}
        >
          Catalog
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          {selectedCategory ? `${selectedCategory}` : searchQuery ? `Results for "${searchQuery}"` : "All Products"}
        </Typography>

        <Typography variant="body2" sx={{ color: "#666666", mt: 1 }}>
          Showing {filteredProducts.length} items
        </Typography>
      </Box>

      {/* Active Filter Chips */}
      {(selectedCategory || searchQuery) && (
        <Stack direction="row" spacing={1} mb={4}>
          {selectedCategory && (
            <Chip
              label={`Category: ${selectedCategory}`}
              onDelete={() => {
                searchParams.delete("category");
                setSearchParams(searchParams);
              }}
              sx={{ backgroundColor: "#000000", color: "#ffffff" }}
            />
          )}
          {searchQuery && (
            <Chip
              label={`Search: ${searchQuery}`}
              onDelete={() => {
                searchParams.delete("search");
                setSearchParams(searchParams);
              }}
              sx={{ backgroundColor: "#000000", color: "#ffffff" }}
            />
          )}
        </Stack>
      )}

      {/* Products Grid */}
      {loading && filteredProducts.length === 0 ? (
        <Box sx={{ py: 10, textAlign: "center" }}>
          <CircularProgress sx={{ color: "#000000" }} />
        </Box>
      ) : filteredProducts.length === 0 ? (
        <Box sx={{ py: 10, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#666666" }}>
            No products found matching your criteria.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2.5, md: 4 }}>
          {filteredProducts.map((product) => (
            <Grid key={product._id} item xs={6} sm={6} md={3} sx={{ display: "flex" }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default ProductPage;