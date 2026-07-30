const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const validate = require("../middleware/validation.middleware");
const {
  placeOrderSchema,
  orderIdSchema,
  updateOrderStatusSchema,
} = require("../validators/order.validators");

router.post(
  "/",
  authenticate,
  authorize("customer"),
  validate(placeOrderSchema),
  orderController.placeOrder,
);

router.get("/", authenticate, authorize("customer"), orderController.getOrders);

router.get(
  "/:id",
  authenticate,
  authorize("customer"),
  validate(orderIdSchema, "params"),
  orderController.getOrderById,
);

router.post(
  "/:id/cancel",
  authenticate,
  authorize("customer"),
  validate(orderIdSchema, "params"),
  orderController.cancelOrder,
);

router.get(
  "/admin/orders",
  authenticate,
  authorize("admin", "seller"),
  orderController.getAllOrders,
);

router.get(
  "/admin/orders/dashboard",
  authenticate,
  authorize("admin", "seller"),
  orderController.getDashboardStatistics,
);

router.get(
  "/admin/orders/:id",
  authenticate,
  authorize("admin", "seller"),
  validate(orderIdSchema, "params"),
  orderController.getAdminOrderById,
);

router.patch(
  "/admin/orders/:id/status",
  authenticate,
  authorize("admin", "seller"),
  validate(orderIdSchema, "params"),
  validate(updateOrderStatusSchema),
  orderController.updateOrderStatus,
);

router.delete(
  "/admin/orders/:id",
  authenticate,
  authorize("admin", "seller"),
  validate(orderIdSchema, "params"),
  orderController.deleteAdminOrder,
);



module.exports = router;
