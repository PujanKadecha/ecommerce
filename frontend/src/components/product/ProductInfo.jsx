import { Box, Chip, Divider, Rating, Stack, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {product.name}
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Rating value={product.averageRating || 0} precision={0.5} readOnly />

        <Typography color="text.secondary">
          ({product.numReviews || 0} Reviews)
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Typography mb={1}>
        <strong>Brand:</strong> {product.brand || "N/A"}
      </Typography>

      <Typography mb={2}>
        <strong>Category:</strong> {product.category || "N/A"}
      </Typography>

      <Typography variant="h4" color="primary" fontWeight="bold" mb={3}>
        ₹ {product.price}
      </Typography>

      <Chip
        label={product.stock > 0 ? "In Stock" : "Out of Stock"}
        color={product.stock > 0 ? "success" : "error"}
        sx={{ mb: 3 }}
      />

      <Typography variant="h6" gutterBottom>
        Description
      </Typography>

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        max={product.stock}
      />

      <Button
        variant="contained"
        fullWidth
        size="large"
        sx={{
          mb: 2,
        }}
        disabled={product.stock === 0}
        onClick={() => {
          console.log("Add To Cart", product, quantity);
        }}
      >
        Add To Cart
      </Button>

      <Button
        variant="outlined"
        fullWidth
        size="large"
        disabled={product.stock === 0}
        onClick={() => {
          console.log("Buy Now", product, quantity);
        }}
      >
        Buy Now
      </Button>
    </Box>
  );
}

export default ProductInfo;
