import { Container, Grid, Typography, Box } from "@mui/material";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Jewellery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
  },
];

function CategoriesSection() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        px: { xs: 3, md: 8 },
        mb: { xs: 10, md: 14 },
      }}
    >
      <Box sx={{ textCenter: "center", mb: 6 }}>
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
          Curated Selections
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            fontSize: { xs: "1.75rem", md: "2.25rem" },
          }}
        >
          Shop By Category
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid
            key={category.name}
            item
            xs={6}
            sm={6}
            md={3}
          >
            <CategoryCard name={category.name} image={category.image} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CategoriesSection;
