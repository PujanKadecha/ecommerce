import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, logoutLocal } from "../../store/slices/auth.slice";
import toast from "react-hot-toast";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});

  const handleLogout = async () => {
  
    dispatch(logoutLocal());
    toast.success("Logged out successfully");
    navigate("/auth/login");
    
    try {
      const refreshToken = JSON.parse(
        localStorage.getItem("persist:auth") || "{}"
      )?.refreshToken;
      dispatch(logout(refreshToken));
    } catch (_) { /* ignore */ }
  };

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
          Account Dashboard
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
          My Profile
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 4, md: 8 }}>
        {/* Account Info Box */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#fafafa",
              p: 4,
              border: "1px solid #e5e5e5",
              textAlign: "center",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                backgroundColor: "#000000",
                fontSize: "2rem",
                fontWeight: 700,
              }}
            >
              {user?.firstName ? user.firstName[0].toUpperCase() : "U"}
            </Avatar>

            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {user?.firstName} {user?.lastName}
            </Typography>

            <Typography variant="body2" sx={{ color: "#666666", mb: 3 }}>
              {user?.email}
            </Typography>

            <Divider sx={{ my: 2, borderColor: "#e5e5e5" }} />

            <Button
              onClick={handleLogout}
              variant="outlined"
              fullWidth
              sx={{
                borderColor: "#000000",
                color: "#000000",
                fontWeight: 700,
                letterSpacing: "0.1em",
                "&:hover": { backgroundColor: "#000000", color: "#ffffff" },
              }}
            >
              Sign Out
            </Button>
          </Box>
        </Grid>

        {/* Quick Navigation Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box
                component={Link}
                to="/orders"
                sx={{
                  p: 4,
                  border: "1px solid #e5e5e5",
                  display: "block",
                  textDecoration: "none",
                  color: "#000000",
                  transition: "all 0.2s ease",
                  "&:hover": { borderColor: "#000000", backgroundColor: "#fafafa" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, textTransform: "uppercase", mb: 1 }}
                >
                  My Orders →
                </Typography>
                <Typography variant="body2" sx={{ color: "#666666" }}>
                  View past purchase history, order status, and item details.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                component={Link}
                to="/cart"
                sx={{
                  p: 4,
                  border: "1px solid #e5e5e5",
                  display: "block",
                  textDecoration: "none",
                  color: "#000000",
                  transition: "all 0.2s ease",
                  "&:hover": { borderColor: "#000000", backgroundColor: "#fafafa" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, textTransform: "uppercase", mb: 1 }}
                >
                  Shopping Bag →
                </Typography>
                <Typography variant="body2" sx={{ color: "#666666" }}>
                  Manage saved items and view current order subtotal.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfilePage;
