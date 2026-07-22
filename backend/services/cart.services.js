const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const addToCart = async (userId, cartData) => {
  const { productId, quantity } = cartData;
  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  if (product.status !== "active") {
    const error = new Error("Product is not available");
    error.statusCode = 400;
    throw error;
  }
  if (product.stock < quantity) {
    const error = new Error("Insufficient stock");
    error.statusCode = 400;
    throw error;
  }
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [],
    });
  }
  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );
  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      const error = new Error("Insufficient stock");
      error.statusCode = 400;
      throw error;
    }
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: product._id,
      quantity,
      price: product.price,
    });
  }
  await cart.save();
  await cart.populate("items.product");
  return cart;
};

const getMyCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    select: "name slug price stock images status",
  });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [],
    });

    await cart.save();

    await cart.populate({
      path: "items.product",
      select: "name slug price stock images status",
    });
  }
  return cart;
};

const updateCartItem = async (userId, itemId, quantity) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    throw error;
  }

  const item = cart.items.id(itemId);

  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    throw error;
  }

  const product = await Product.findById(item.product);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  if (product.status !== "active") {
    const error = new Error("Product is not available");
    error.statusCode = 400;
    throw error;
  }

  if (quantity > product.stock) {
    const error = new Error("Insufficient stock");
    error.statusCode = 400;
    throw error;
  }
  item.quantity = quantity;
  item.price = product.price;
  await cart.save();
  await cart.populate({
    path: "items.product",
    select: "name slug price stock images status",
  });
  return cart;
};

const removeCartItem = async (userId, itemId) => {
  const cart = await Cart.findOne({
    user: userId,
  });
  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    throw error;
  }
  const item = cart.items.id(itemId);

  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;

    throw error;
  }
  item.deleteOne();
  await cart.save();
  await cart.populate({
    path: "items.product",
    select: "name slug price stock images status",
  });
  return cart;
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({user:userId});

  if(!cart){
    const error = new Error("Cart not Found");
    error.statusCode = 404;
    throw error;
  }

  cart.items = [];
  await cart.save();
  return cart;
}

module.exports = {
  addToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
  clearCart
};
