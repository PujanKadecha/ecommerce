const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const Address = require("../models/address.model");

const placeOrder = async (userId, orderData) => {
  const cart = await Cart.findOne({
    user: userId,
  }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    const error = new Error("Cart is empty");
    error.statusCode = 400;

    throw error;
  }

  const address = await Address.findOne({
    _id: orderData.addressId,
    user: userId,
  });

  if (!address) {
    const error = new Error("Address not found");
    error.statusCode = 404;

    throw error;
  }

  const orderItems = [];

  let subtotal = 0;

  for (const item of cart.items) {
    const product = item.product;

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;

      throw error;
    }

    if (product.status !== "active") {
      const error = new Error(`${product.name} is unavailable`);
      error.statusCode = 400;

      throw error;
    }

    if (product.stock < item.quantity) {
      const error = new Error(`Insufficient stock for ${product.name}`);
      error.statusCode = 400;

      throw error;
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      image: product.images.length > 0 ? product.images[0].url : "",
      price: product.price,
      quantity: item.quantity,
    });

    subtotal += product.price * item.quantity;
  }

  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: {
        stock: -item.quantity,
      },
    });
  }

  const order = await Order.create({
    user: userId,

    items: orderItems,

    shippingAddress: {
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      landmark: address.landmark,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    },
    subtotal,
    shippingCharge: 0,
    tax: 0,
    discount: 0,
    totalAmount: subtotal,
    paymentMethod: orderData.paymentMethod,
  });
  cart.items = [];
  cart.subtotal = 0;
  await cart.save();
  return order;
};

const getOrders = async (userId) => {
  const orders = await Order.find({ user: userId }).sort({
    createdAt: -1,
  });

  return orders;
};

const getOrderById = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  return order;
};

const cancelOrder = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;

    throw error;
  }

  if (!["pending", "confirmed"].includes(order.orderStatus)) {
    const error = new Error(
      "Only pending or confirmed orders can be cancelled",
    );

    error.statusCode = 400;

    throw error;
  }

  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: {
        stock: item.quantity,
      },
    });
  }

  order.orderStatus = "cancelled";

  await order.save();

  return order;
};

const getAllOrders = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = {};

  if (query.orderStatus) {
    filter.orderStatus = query.orderStatus;
  }

  if (query.paymentStatus) {
    filter.paymentStatus = query.paymentStatus;
  }

  const orders = await Order.find(filter)
    .populate("user", "name email")
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const totalOrders = await Order.countDocuments(filter);

  return {
    orders,
    pagination: {
      totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      limit,
    },
  };
};

const getAdminOrderById = async (orderId) => {
  const order = await Order.findById(orderId).populate(
    "user",
    "name email role",
  );

  if (!order) {
    const error = new Error("Order Not Found");
    error.statusCode = 404;
    throw error;
  }

  return order;
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  if (order.orderStatus === "cancelled" || order.orderStatus === "delivered") {
    const error = new Error(`Cannot update a ${order.orderStatus} order`);
    error.statusCode = 400;
    throw error;
  }

  const transitions = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["processing", "cancelled"],
    processing: ["shipped"],
    shipped: ["delivered"],
  };

  const allowedStatuses = transitions[order.orderStatus] || [];

  if (!allowedStatuses.includes(status)) {
    const error = new Error(
      `Cannot change status from ${order.orderStatus} to ${status}`,
    );

    error.statusCode = 400;

    throw error;
  }
  order.orderStatus = status;

  if (status === "delivered" && order.paymentMethod === "cod") {
    order.paymentStatus = "paid";
  }
  await order.save();
  return order;
};

const getDashboardStatistics = async () => {
  const stats = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalOrders: {
          $sum: 1,
        },
        totalRevenue: {
          $sum: "$totalAmount",
        },
        pendingOrders: {
          $sum: {
            $cond: [
              {
                $eq: ["$orderStatus", "pending"],
              },
              1,
              0,
            ],
          },
        },

        deliveredOrders: {
          $sum: {
            $cond: [
              {
                $eq: ["$orderStatus", "delivered"],
              },
              1,
              0,
            ],
          },
        },

        cancelledOrders: {
          $sum: {
            $cond: [
              {
                $eq: ["$orderStatus", "cancelled"],
              },
              1,
              0,
            ],
          },
        },

        paidOrders: {
          $sum: {
            $cond: [
              {
                $eq: ["$paymentStatus", "paid"],
              },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  const recentOrders = await Order.find()
    .populate("user", "name email")
    .sort({
      createdAt: -1,
    })
    .limit(5);

  return {
    statistics: stats[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
      paidOrders: 0,
    },
    recentOrders,
  };
};

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  getAdminOrderById,
  updateOrderStatus,
  getDashboardStatistics
};
