import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Typography, Box, CircularProgress } from "@mui/material";
import CategoryCard from "./CategoryCard";
import { fetchCategories } from "../../store/slices/category.slice";

const fallbackImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop";

function CategoriesSection() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <Container maxWidth="xl" sx={{ mb: { xs: 8, md: 12 } }}>
      <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: { xs: "center", sm: "left" } }}>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#0284c7",
            mb: 1,
            fontSize: "0.8rem",
          }}
        >
          Curated Collections
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
            color: "#111827",
          }}
        >
          Shop By Category
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Grid key={category._id} item xs={12} sm={6} md={4}>
                <CategoryCard
                  name={category.name}
                  tagline={category.description || "Explore this category"}
                  image={category.image?.url || fallbackImage}
                  count={""} 
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" textAlign="center" color="textSecondary">
                No categories found.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default CategoriesSection;
