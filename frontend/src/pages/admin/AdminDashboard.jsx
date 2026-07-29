import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Button,
  Divider,
  alpha,
} from "@mui/material";
import {
  People,
  Inventory,
  Category,
  ShoppingCart,
  VerifiedUser,
  TrendingUp,
} from "@mui/icons-material";
import { fetchDashboardStats } from "../../store/slices/admin.slice";

const StatCard = ({ title, value, icon, bgColor, iconColor }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      border: "1px solid #f0f0f0",
      backgroundColor: "#ffffff",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "#d0d0d0",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#888888",
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: "2rem",
              color: "#111111",
              letterSpacing: "-0.02em",
            }}
          >
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: bgColor || "#f5f5f5",
            borderRadius: "12px",
            p: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            flexShrink: 0,
          }}
        >
          <Box sx={{ color: iconColor || "#000000", display: "flex" }}>
            {icon}
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          p: 4,
          border: "1px solid #fee2e2",
          backgroundColor: "#fff5f5",
        }}
      >
        <Typography color="error" variant="h6" sx={{ fontWeight: 600 }}>
          Error loading dashboard
        </Typography>
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: <People fontSize="small" />,
      bgColor: "#e0f2fe",
      iconColor: "#0284c7",
    },
    {
      title: "Verified Users",
      value: stats?.verifiedUsers ?? 0,
      icon: <VerifiedUser fontSize="small" />,
      bgColor: "#dcfce7",
      iconColor: "#16a34a",
    },
    {
      title: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: <Inventory fontSize="small" />,
      bgColor: "#fef3c7",
      iconColor: "#d97706",
    },
    {
      title: "Total Categories",
      value: stats?.totalCategories ?? 0,
      icon: <Category fontSize="small" />,
      bgColor: "#f3e8ff",
      iconColor: "#9333ea",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: <ShoppingCart fontSize="small" />,
      bgColor: "#ffe4e6",
      iconColor: "#e11d48",
    },
  ];

  const quickActions = [
    {
      label: "Manage Users",
      icon: <People />,
      path: "/admin/users",
      color: "info",
    },
    {
      label: "Manage Products",
      icon: <Inventory />,
      path: "/admin/products",
      color: "success",
    },
    {
      label: "Manage Categories",
      icon: <Category />,
      path: "/admin/categories",
      color: "warning",
    },
    {
      label: "Manage Orders",
      icon: <ShoppingCart />,
      path: "/admin/orders",
      color: "error",
    },
  ];

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#888888",
            mb: 0.5,
          }}
        >
          Admin Panel
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: "#111111", letterSpacing: "-0.01em" }}
        >
          Dashboard Overview
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={3}>
        {statCards.map((card) => (
          <Grid key={card.title} item xs={12} sm={6} md={4} lg={2.4}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 5, borderColor: "#f0f0f0" }} />

      {/* Quick Actions */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#111111", mb: 0.5 }}
        >
          Quick Actions
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#888888", fontSize: "0.85rem" }}
        >
          Navigate to key management areas
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {quickActions.map((action) => (
          <Grid key={action.path} item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              color={action.color}
              size="large"
              startIcon={action.icon}
              onClick={() => navigate(action.path)}
              sx={{
                py: 2.5,
                fontWeight: 700,
                letterSpacing: "0.06em",
                fontSize: "0.85rem",
              }}
            >
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
