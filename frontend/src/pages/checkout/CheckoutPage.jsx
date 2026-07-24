import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stack,
  Divider,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/slices/order.slice";
import { clearCart } from "../../store/slices/cart.slice";
import toast from "react-hot-toast";

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, subtotal } = useSelector((state) => state.cart || {});

  const { user } = useSelector((state) => state.auth || {});

  const [address, setAddress] = useState({
    fullName: user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Customer Name" : "Customer Name",
    phone: user?.phone || "9876543210",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const shippingFee = subtotal > 0 ? (subtotal > 2000 ? 0 : 150) : 0;
  const grandTotal = subtotal + shippingFee;

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.street || !address.city || !address.state || !address.zipCode) {
      setErrorMessage("Please complete all required shipping address fields.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(address.phone)) {
      setErrorMessage("Phone number must be a valid 10-digit number starting with 6-9 (e.g. 9876543210).");
      return;
    }

    if (!/^\d{6}$/.test(address.zipCode)) {
      setErrorMessage("PIN / Zip Code must be a 6-digit number (e.g. 384001).");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      
      const addressRes = await import("../../api/address.api").then((m) =>
        m.addAddress({
          fullName: address.fullName.trim(),
          phone: address.phone.trim(),
          addressLine1: address.street.trim(),
          city: address.city.trim(),
          state: address.state.trim(),
          postalCode: address.zipCode.trim(),
          country: address.country.trim() || "India",
        })
      );

      const addressId = addressRes.data?.data?._id;
      if (!addressId) {
        throw new Error("Failed to save shipping address.");
      }

      
      const mappedPayment = paymentMethod === "COD" ? "cod" : "stripe";

      
      const result = await dispatch(createOrder({ addressId, paymentMethod: mappedPayment }));

      if (createOrder.fulfilled.match(result)) {
        dispatch(clearCart());
        toast.success("Order Placed Successfully!");
        navigate("/orders");
      } else {
        setErrorMessage(result.payload || "Failed to place order. Please try again.");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Failed to process order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!items || items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          YOUR BAG IS EMPTY
        </Typography>
        <Button
          onClick={() => navigate("/products")}
          variant="contained"
          sx={{ backgroundColor: "#000000", color: "#ffffff" }}
        >
          Return to Shop
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
          Checkout
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
          Shipping & Payment
        </Typography>
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 0 }}>
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handlePlaceOrder}>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* Shipping & Payment Form */}
          <Grid item xs={12} md={7}>
            <Stack spacing={4}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    mb: 3,
                  }}
                >
                  1. Shipping Address
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="FULL NAME"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="PHONE NUMBER (10 digits)"
                      name="phone"
                      value={address.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="STREET ADDRESS"
                      name="street"
                      value={address.street}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="CITY"
                      name="city"
                      value={address.city}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="STATE"
                      name="state"
                      value={address.state}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="PIN / ZIP CODE (6 digits)"
                      name="zipCode"
                      value={address.zipCode}
                      onChange={handleInputChange}
                      placeholder="384001"
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="COUNTRY"
                      name="country"
                      value={address.country}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ borderColor: "#e5e5e5" }} />

              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                >
                  2. Payment Option
                </Typography>

                <FormControl component="fieldset">
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel
                      value="COD"
                      control={<Radio sx={{ color: "#000000", "&.Mui-checked": { color: "#000000" } }} />}
                      label="Cash On Delivery (COD)"
                    />
                    <FormControlLabel
                      value="ONLINE"
                      control={<Radio sx={{ color: "#000000", "&.Mui-checked": { color: "#000000" } }} />}
                      label="Online Payment (Credit / Debit Card / UPI)"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Stack>
          </Grid>

          {/* Order Summary Sidebar */}
          <Grid item xs={12} md={5}>
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
                Your Order
              </Typography>

              <Stack spacing={2} sx={{ mb: 3 }}>
                {items.map((i) => (
                  <Box
                    key={i._id}
                    sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}
                  >
                    <Typography variant="body2" noWrap sx={{ maxWidth: 220, fontWeight: 600 }}>
                      {i.product.name} (x{i.quantity})
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      ₹{(i.product.price * i.quantity).toLocaleString()}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ borderColor: "#e5e5e5", my: 1 }} />

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
                    Shipping
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: "#e5e5e5", my: 1 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, textTransform: "uppercase" }}>
                    Total Amount
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    ₹{grandTotal.toLocaleString()}
                  </Typography>
                </Box>
              </Stack>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={submitting}
                sx={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  py: 1.8,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  "&:hover": { backgroundColor: "#222222" },
                }}
              >
                {submitting ? "Processing..." : "Place Order"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default CheckoutPage;
