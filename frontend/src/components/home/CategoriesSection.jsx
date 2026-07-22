import { Container, Grid, Typography } from "@mui/material";

import {
  PhoneIphone,
  Laptop,
  Checkroom,
  SportsEsports,
  Watch,
  MenuBook,
  Diamond,
  Headphones,
} from "@mui/icons-material";

import CategoryCard from "./CategoryCard";

const categories = [
  {
    name: "Electronics",
    icon: <Laptop fontSize="inherit" />,
  },
  {
    name: "Mobiles",
    icon: <PhoneIphone fontSize="inherit" />,
  },
  {
    name: "Fashion",
    icon: <Checkroom fontSize="inherit" />,
  },
  {
    name: "Gaming",
    icon: <SportsEsports fontSize="inherit" />,
  },
  {
    name: "Watches",
    icon: <Watch fontSize="inherit" />,
  },
  {
    name: "Books",
    icon: <MenuBook fontSize="inherit" />,
  },
  {
    name: "Jewellery",
    icon: <Diamond fontSize="inherit" />,
  },
  {
    name: "Accessories",
    icon: <Headphones fontSize="inherit" />,
  },
];

function CategoriesSection() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 8,
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Shop by Category
      </Typography>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid
            key={category.name}
            size={{
              xs: 6,
              sm: 4,
              md: 3,
            }}
          >
            <CategoryCard name={category.name} icon={category.icon} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CategoriesSection;
