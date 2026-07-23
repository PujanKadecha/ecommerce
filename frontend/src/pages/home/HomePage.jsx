import { Box } from "@mui/material";
import HeroBanner from "../../components/home/HeroBanner";
import CategoriesSection from "../../components/home/CategoriesSection";
import FeaturedProducts from "../../components/home/FeaturedProducts";

function HomePage() {
  return (
    <Box sx={{ width: "100%" }}>
      <HeroBanner />
      <CategoriesSection />
      <FeaturedProducts />
    </Box>
  );
}

export default HomePage;
