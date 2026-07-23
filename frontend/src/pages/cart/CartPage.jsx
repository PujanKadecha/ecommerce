import { useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  Divider,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";
import { DeleteOutlined, ArrowForward } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchCart,
  updateItemQuantity,
  removeItemFromCart,
} from "../../store/slices/cart.slice";
import QuantitySelector from "../../components/product/QuantitySelector";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, subtotal, loading } = useSelector((state) => state.cart || {});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = async (itemId, newQty) => {
    if (newQty > 0) {
      const result = await dispatch(updateItemQuantity({ itemId, quantity: newQty }));
      if (!updateItemQuantity.fulfilled.match(result)) {
        toast.error(result.payload || "Failed to update item");
      }
    }
  };

  const handleRemove = async (itemId) => {
    const result = await dispatch(removeItemFromCart(itemId));
    if (!removeItemFromCart.fulfilled.match(result)) {
      toast.error(result.payload || "Failed to remove item");
    } else {
      toast.success("Item removed");
    }
  };

  const shippingFee = subtotal > 0 ? (subtotal > 2000 ? 0 : 150) : 0;
  const grandTotal = subtotal + shippingFee;

  if (loading && items.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 15, textAlign: "center" }}>
        <CircularProgress sx={{ color: "#000000" }} />
      </Container>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 }, py: { xs: 10, md: 15 }, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          Your Shopping Bag Is Empty
        </Typography>

        <Typography variant="body1" sx={{ color: "#666666", mb: 4 }}>
          Explore our minimalist curated catalog to add items to your cart.
        </Typography>

        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            backgroundColor: "#000000",
            color: "#ffffff",
            px: 4,
            py: 1.6,
            fontWeight: 700,
            letterSpacing: "0.1em",
            "&:hover": { backgroundColor: "#222222" },
          }}
        >
          Explore Catalog
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 10 } }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#666666",
            display: "block",
            mb: 1,
          }}
        >
          Shopping Bag
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Your Cart ({items.length} {items.length === 1 ? "Item" : "Items"})
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 4, md: 8 }}>
        {/* Cart Items List */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {items.map((item) => {
              const product = item.product || {};
              const imageUrl =
                product.images?.[0]?.url ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop";

              return (
                <Box
                  key={item._id || product._id}
                  sx={{
                    display: "flex",
                    gap: 3,
                    pb: 3,
                    borderBottom: "1px solid #e5e5e5",
                  }}
                >
                  {/* Thumbnail Image */}
                  <Box
                    component={Link}
                    to={`/products/${product._id}`}
                    sx={{
                      width: { xs: 90, sm: 120 },
                      height: { xs: 120, sm: 160 },
                      backgroundColor: "#f5f5f5",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={imageUrl}
                      alt={product.name}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>

                  {/* Details */}
                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        {product.category && (
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "#888888",
                            }}
                          >
                            {product.category}
                          </Typography>
                        )}
                        <Typography
                          component={Link}
                          to={`/products/${product._id}`}
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: "0.95rem", sm: "1.1rem" },
                            color: "#000000",
                            textDecoration: "none",
                            display: "block",
                            mt: 0.5,
                          }}
                        >
                          {product.name}
                        </Typography>
                      </Box>

                      <IconButton
                        size="small"
                        onClick={() => handleRemove(item._id)}
                        sx={{ color: "#666666", "&:hover": { color: "#000000" } }}
                      >
                        <DeleteOutlined fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Price and Quantity */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                      <QuantitySelector
                        quantity={item.quantity}
                        setQuantity={(newQty) => handleQuantityChange(item._id, newQty)}
                        max={product.stock || 99}
                      />

                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#000000" }}>
                        ₹{(product.price * item.quantity)?.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Grid>

        {/* Order Summary Sidebar */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#fafafa",
              p: { xs: 3, md: 4 },
              border: "1px solid #e5e5e5",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                mb: 3,
              }}
            >
              Order Summary
            </Typography>

            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: "#666666" }}>
                  Subtotal
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  ₹{subtotal.toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: "#666666" }}>
                  Estimated Shipping
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "#e5e5e5", my: 1 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, textTransform: "uppercase" }}>
                  Total
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  ₹{grandTotal.toLocaleString()}
                </Typography>
              </Box>
            </Stack>

            <Button
              onClick={() => navigate("/checkout")}
              variant="contained"
              fullWidth
              size="large"
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                py: 1.8,
                fontWeight: 700,
                letterSpacing: "0.12em",
                "&:hover": { backgroundColor: "#222222" },
              }}
            >
              Proceed To Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartPage;
