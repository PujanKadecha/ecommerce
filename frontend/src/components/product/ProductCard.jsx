import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const imageUrl =
    product.images?.[0]?.url || "https://placehold.co/400x600?text=No+Image";

  return (
    <Card
      component={Link}
      to={`/products/${product._id}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        transition: "opacity 0.3s ease",
        "&:hover": { opacity: 0.8 },
      }}
    >
      <Box sx={{ position: "relative", paddingTop: "133%" }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={product.name}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <CardContent
        sx={{ p: 2, paddingBottom: "16px !important", textAlign: "center" }}
      >
        <Typography variant="body1" fontWeight="600" noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          ₹{product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
