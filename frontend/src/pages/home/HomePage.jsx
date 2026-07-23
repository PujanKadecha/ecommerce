import { Container } from "@mui/material";
import HeroBanner from "../../components/home/HeroBanner";
import CategoriesSection from "../../components/home/CategoriesSection";
import FeaturedProducts from "../../components/home/FeaturedProducts";

function HomePage() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <HeroBanner />

      <CategoriesSection />

      <FeaturedProducts />
    </Container>
  );
}

export default HomePage;
