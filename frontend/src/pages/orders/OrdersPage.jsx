import { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/slices/order.slice";

function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order || {});

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading && (!orders || orders.length === 0)) {
    return (
      <Container maxWidth="xl" sx={{ py: 15, textAlign: "center" }}>
        <CircularProgress sx={{ color: "#000000" }} />
      </Container>
    );
  }

  if (!orders || orders.length === 0) {
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
          No Orders Placed Yet
        </Typography>

        <Typography variant="body1" sx={{ color: "#666666", mb: 4 }}>
          When you place an order, your purchase history will appear here.
        </Typography>

        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="large"
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
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 10 } }}>
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
          Order History
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
          Your Orders ({orders.length})
        </Typography>
      </Box>

      <Stack spacing={4}>
        {orders.map((order) => (
          <Box
            key={order._id}
            sx={{
              border: "1px solid #e5e5e5",
              p: { xs: 3, md: 4 },
              backgroundColor: "#fafafa",
            }}
          >
            {/* Header info */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
                mb: 3,
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ color: "#888888", fontWeight: 700 }}>
                  ORDER #{order._id?.slice(-8).toUpperCase()}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666666", mt: 0.5 }}>
                  Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Chip
                  label={order.status || "PENDING"}
                  sx={{
                    borderRadius: 0,
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    backgroundColor:
                      order.status === "Delivered"
                        ? "#000000"
                        : order.status === "Cancelled"
                        ? "#e5e5e5"
                        : "#111111",
                    color: order.status === "Cancelled" ? "#666666" : "#ffffff",
                  }}
                />

                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  ₹{(order.totalAmount || order.totalPrice || 0).toLocaleString()}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3, borderColor: "#e5e5e5" }} />

            {/* Items */}
            <Stack spacing={2}>
              {(order.items || order.orderItems || []).map((item, idx) => {
                const prod = item.product || {};
                return (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {prod.name || "Product Item"} (x{item.quantity})
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      ₹{((item.price || prod.price || 0) * item.quantity).toLocaleString()}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}

export default OrdersPage;
