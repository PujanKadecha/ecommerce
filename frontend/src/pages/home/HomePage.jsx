import { Container } from "@mui/material";
import HeroBanner from "../../components/home/HeroBanner";
import CategoriesSection from "../../components/home/CategoriesSection";

function HomePage() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
      }}
    >
      <HeroBanner />

      <CategoriesSection />
    </Container>
  );
}

export default HomePage;
