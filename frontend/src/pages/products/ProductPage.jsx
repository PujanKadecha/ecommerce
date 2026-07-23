import { useEffect, useState } from "react";
import { Container, Typography, Grid, Box, Chip, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import ProductCard from "../../components/product/ProductCard";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products");
        let fetched = res.data?.data || [];

        if (selectedCategory) {
          fetched = fetched.filter(
            (p) =>
              p.category?.toLowerCase() === selectedCategory.toLowerCase()
          );
        }

        if (searchQuery) {
          fetched = fetched.filter(
            (p) =>
              p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.description?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setProducts(fetched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory, searchQuery]);

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
          Showing {products.length} items
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
      {products.length === 0 && !loading ? (
        <Box sx={{ py: 10, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#666666" }}>
            No products found matching your criteria.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2.5, md: 4 }}>
          {products.map((product) => (
            <Grid key={product._id} item xs={6} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default ProductPage;