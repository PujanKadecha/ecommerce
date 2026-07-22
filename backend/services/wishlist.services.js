const Wishlist = require("../models/wishlist.model");
const Product = require("../models/product.model");

const addToWishlist = async (userId, wishlistData) => {
  const { productId } = wishlistData;
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
  let wishlist = await Wishlist.findOne({
    user: userId,
  });

  if (!wishlist) {
    wishlist = new Wishlist({
      user: userId,
      products: [],
    });
  }
  const exists = wishlist.products.some((id) => id.toString() === productId);

  if (exists) {
    const error = new Error("Product already exists in wishlist");
    error.statusCode = 400;
    throw error;
  }
  wishlist.products.push(product._id);
  await wishlist.save();
  await wishlist.populate({
    path: "products",
    select: "name slug price stock images status",
  });

  return wishlist;
};

const getMyWishlists = async (userId) => {
  let wishlist = await Wishlist.findOne({
    user: userId,
  }).populate({
    path: "products",
    select: "name slug price stock images status",
  });

  if (!wishlist) {
    wishlist = new Wishlist({
      user: userId,
      products: [],
    });

    await wishlist.save();

    await wishlist.populate({
      path: "products",
      select: "name slug price stock images status",
    });
  }

  return wishlist;
};

const removeFromWishlist = async (userId, productId) => {
  const wishlist = await Wishlist.findOne({
    user: userId,
  });
  if (!wishlist) {
    const error = new Error("Wishlist not found");
    error.statusCode = 404;
    throw error;
  }
  const exists = wishlist.products.some((id) => id.toString() === productId);
  if (!exists) {
    const error = new Error("Product not found in wishlist");
    error.statusCode = 404;

    throw error;
  }
  wishlist.products = wishlist.products.filter(
    (id) => id.toString() !== productId,
  );
  await wishlist.save();
  await wishlist.populate({
    path: "products",
    select: "name slug price stock images status",
  });
  return wishlist;
};

const clearWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    const error = new Error("Wishlist not Found");
    error.statusCode = 404;
    throw error;
  }
  wishlist.products = [];
  await wishlist.save();
  await wishlist.populate({
    path: "products",
    select: "name slug price stock images status",
  });

  return wishlist;
};

module.exports = {
  addToWishlist,
  getMyWishlists,
  removeFromWishlist,
  clearWishlist
};
