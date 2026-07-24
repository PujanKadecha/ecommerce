import { Box, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";

function CategoryCard({ name, tagline, image, count }) {
  return (
    <Box
      component={Link}
      to={`/products?category=${encodeURIComponent(name)}`}
      sx={{
        position: "relative",
        display: "block",
        width: "100%",
        height: { xs: 260, sm: 300, md: 340 },
        borderRadius: "16px",
        overflow: "hidden",
        textDecoration: "none",
        color: "#ffffff",
        backgroundColor: "#0f172a",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 35px -10px rgba(0, 0, 0, 0.25)",
          "& .category-img": {
            transform: "scale(1.08)",
            filter: "brightness(0.75)",
          },
          "& .arrow-icon": {
            transform: "translateX(6px)",
          },
        },
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        className="category-img"
        src={image}
        alt={name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "brightness(0.8)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease",
        }}
      />

      {/* Top Badge Pill */}
      {count && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(8px)",
            color: "#f8fafc",
            px: 1.5,
            py: 0.5,
            borderRadius: "20px",
            fontSize: "0.725rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          {count}
        </Box>
      )}

      {/* Overlay Content */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 50%, rgba(15, 23, 42, 0) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: { xs: 2.5, sm: 3 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.01em",
            fontSize: { xs: "1.15rem", sm: "1.3rem" },
            color: "#ffffff",
            mb: 0.5,
          }}
        >
          {name}
        </Typography>

        {tagline && (
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "0.825rem",
              fontWeight: 400,
              mb: 2,
            }}
          >
            {tagline}
          </Typography>
        )}

        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            color: "#38bdf8",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Explore Collection
          <ArrowForward
            className="arrow-icon"
            sx={{
              fontSize: "1rem",
              transition: "transform 0.3s ease",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CategoryCard;
