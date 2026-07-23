import { Container, Typography, Box } from "@mui/material";
import CategoriesSection from "../../components/home/CategoriesSection";

function CategoryPage() {
  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 }, mb: 4 }}>
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
          Explore
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
          All Categories
        </Typography>
      </Container>

      <CategoriesSection />
    </Box>
  );
}

export default CategoryPage;