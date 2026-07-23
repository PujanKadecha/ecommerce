import { useState } from "react";
import { Box, Chip, Divider, Rating, Stack, Typography, Button } from "@mui/material";
import QuantitySelector from "./QuantitySelector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../../store/slices/cart.slice";
import toast from "react-hot-toast";

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const result = await dispatch(addItemToCart({ productId: product._id, quantity }));
    if (addItemToCart.fulfilled.match(result)) {
      toast.success("Added to shopping bag!");
    } else {
      toast.error(result.payload || "Please login to add items to cart.");
    }
  };

  const handleBuyNow = async () => {
    const result = await dispatch(addItemToCart({ productId: product._id, quantity }));
    if (addItemToCart.fulfilled.match(result)) {
      navigate("/cart");
    } else {
      toast.error(result.payload || "Please login to process action.");
    }
  };

  return (
    <Box
      sx={{
        position: { md: "sticky" },
        top: { md: 100 },
      }}
    >
      {/* Category & Brand */}
      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        {product.category && (
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#888888",
              fontSize: "0.75rem",
            }}
          >
            {product.category}
          </Typography>
        )}
        {product.category && product.brand && (
          <Typography variant="caption" sx={{ color: "#cccccc" }}>
            •
          </Typography>
        )}
        {product.brand && (
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#666666",
              fontSize: "0.75rem",
            }}
          >
            {product.brand}
          </Typography>
        )}
      </Stack>

      {/* Product Title */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          letterSpacing: "-0.02em",
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          color: "#000000",
          mb: 1.5,
          lineHeight: 1.2,
        }}
      >
        {product.name}
      </Typography>

      {/* Rating & Stock */}
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <Rating
          value={product.averageRating || 4.5}
          precision={0.5}
          readOnly
          size="small"
          sx={{ color: "#000000" }}
        />

        <Typography variant="caption" sx={{ color: "#666666", fontWeight: 500 }}>
          ({product.numReviews || 0} Reviews)
        </Typography>

        <Chip
          label={product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
          sx={{
            height: 22,
            fontSize: "0.65rem",
            backgroundColor: product.stock > 0 ? "#000000" : "#e5e5e5",
            color: product.stock > 0 ? "#ffffff" : "#666666",
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        />
      </Stack>

      {/* Price */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "#000000",
          mb: 3,
          letterSpacing: "-0.02em",
        }}
      >
        ₹{product.price?.toLocaleString() || product.price}
      </Typography>

      <Divider sx={{ mb: 3, borderColor: "#e5e5e5" }} />

      {/* Description Snippet */}
      {product.description && (
        <Typography
          variant="body2"
          sx={{
            color: "#555555",
            lineHeight: 1.8,
            mb: 3,
            fontSize: "0.9rem",
          }}
        >
          {product.description}
        </Typography>
      )}

      {/* Quantity Selector */}
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        max={product.stock || 99}
      />

      {/* Action Buttons */}
      <Stack spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          sx={{
            backgroundColor: "#000000",
            color: "#ffffff",
            py: 1.8,
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            "&:hover": {
              backgroundColor: "#222222",
            },
          }}
        >
          Add To Shopping Bag
        </Button>

        <Button
          variant="outlined"
          fullWidth
          size="large"
          disabled={product.stock === 0}
          onClick={handleBuyNow}
          sx={{
            borderColor: "#000000",
            color: "#000000",
            py: 1.8,
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            borderWidth: "1.5px",
            "&:hover": {
              borderWidth: "1.5px",
              backgroundColor: "#000000",
              color: "#ffffff",
            },
          }}
        >
          Buy Now
        </Button>
      </Stack>
    </Box>
  );
}

export default ProductInfo;
