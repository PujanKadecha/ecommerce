import { Card, CardActionArea, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function CategoryCard({ name, icon }) {
  return (
    <Card
      sx={{
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/products?category=${encodeURIComponent(name)}`}
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            fontSize: 50,
          }}
        >
          {icon}
        </Box>

        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default CategoryCard;
