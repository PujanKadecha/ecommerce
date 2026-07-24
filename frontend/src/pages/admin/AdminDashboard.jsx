import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, Box, CircularProgress, Card, CardContent, Button, Divider } from "@mui/material";
import { People, Inventory, Category, ShoppingCart } from "@mui/icons-material";
import { fetchDashboardStats } from "../../store/slices/admin.slice";

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}.light`,
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
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
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6">
        Error loading dashboard: {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={<People sx={{ color: "primary.main" }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={stats?.totalProducts || 0}
            icon={<Inventory sx={{ color: "success.main" }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Categories"
            value={stats?.totalCategories || 0}
            icon={<Category sx={{ color: "warning.main" }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={stats?.totalOrders || 0}
            icon={<ShoppingCart sx={{ color: "info.main" }} />}
            color="info"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            startIcon={<People />}
            onClick={() => navigate("/admin/users")}
            sx={{ py: 2 }}
          >
            Manage Users
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            size="large"
            startIcon={<Inventory />}
            onClick={() => navigate("/admin/products")}
            sx={{ py: 2 }}
          >
            Manage Products
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            size="large"
            startIcon={<Category />}
            onClick={() => navigate("/admin/categories")}
            sx={{ py: 2 }}
          >
            Manage Categories
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
