import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function CategoryCard({ name, image }) {
  return (
    <Box
      component={Link}
      to={`/products?category=${encodeURIComponent(name)}`}
      className="img-zoom-container"
      sx={{
        position: "relative",
        display: "block",
        width: "100%",
        height: { xs: 240, sm: 300, md: 360 },
        overflow: "hidden",
        textDecoration: "none",
        color: "#ffffff",
        backgroundColor: "#111111",
      }}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "brightness(0.85)",
        }}
      />
      
      {/* Subtle Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontSize: { xs: "0.95rem", md: "1.1rem" },
            color: "#ffffff",
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "rgba(255, 255, 255, 0.7)",
            mt: 0.5,
          }}
        >
          Explore Category →
        </Typography>
      </Box>
    </Box>
  );
}

export default CategoryCard;
