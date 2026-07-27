import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, ViewList as ViewIcon } from "@mui/icons-material";
import {
  fetchAdminOrders,
  updateAdminOrderStatus,
  deleteAdminOrder,
  clearAdminError,
  clearAdminSuccess,
} from "../../../store/slices/admin.slice";
import toast from "react-hot-toast";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "confirmed":
      return "info";
    case "processing":
      return "secondary";
    case "shipped":
      return "primary";
    case "delivered":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

function AdminOrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading, error, success } = useSelector((state) => state.admin);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAdminError());
    }
    if (success) {
      dispatch(clearAdminSuccess());
    }
  }, [error, success, dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateAdminOrderStatus({ id, orderStatus: newStatus }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      dispatch(deleteAdminOrder(id));
    }
  };

  if (loading && orders.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Orders Management
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Payment</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                      {order._id.substring(order._id.length - 8)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {/* <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {order.user?.name || "Unknown"}
                    </Typography> */}
                    <Typography variant="caption" color="text.secondary">
                      {order.user?.email || "No email"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>₹{order.totalAmount}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={order.paymentStatus.toUpperCase()}
                      color={order.paymentStatus === "paid" ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      sx={{
                        fontSize: "0.85rem",
                        minWidth: 120,
                        backgroundColor: "#fff",
                      }}
                      disabled={order.orderStatus === "cancelled" || order.orderStatus === "delivered"}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(order._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <Dialog
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
              Order Details
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Order ID</Typography>
                <Typography variant="body1">{selectedOrder._id}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Customer</Typography>
                <Typography variant="body1">{selectedOrder.user?.name} ({selectedOrder.user?.email})</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Shipping Address</Typography>
                <Typography variant="body2">
                  {selectedOrder.shippingAddress?.fullName}<br/>
                  {selectedOrder.shippingAddress?.addressLine1}, {selectedOrder.shippingAddress?.addressLine2}<br/>
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.postalCode}<br/>
                  Phone: {selectedOrder.shippingAddress?.phone}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Items</Typography>
                {selectedOrder.items.map((item, idx) => (
                  <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">{item.quantity}x {item.name}</Typography>
                    <Typography variant="body2">₹{item.price * item.quantity}</Typography>
                  </Box>
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedOrder(null)} color="inherit">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default AdminOrdersPage;
