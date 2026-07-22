const wishlistServices = require("../services/wishlist.services");

const addToWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistServices.addToWishlist(
      req.user._id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Item Added in Wishlist",
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

const getMyWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistServices.getMyWishlists(req.user._id);

    res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

const removeFromWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistServices.removeFromWishlist(
      req.user._id,
      req.params.productId,
    );

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

const clearWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistServices.clearWishlist(req.user._id);

    res.status(200).json({
      success: true,
      message: "Wishlist Cleared Successfully",
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
  clearWishlist,
};
