import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card
      component={Link}
      to={`/products/${product._id}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={
          product.images?.[0]?.url ||
          "https://placehold.co/300x220?text=Product"
        }
        alt={product.name}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom noWrap>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>

        <Typography mt={2} variant="h6" color="primary" fontWeight="bold">
          ₹ {product.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button fullWidth variant="contained">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
