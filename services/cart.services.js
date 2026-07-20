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

module.exports = {
    addToCart
};