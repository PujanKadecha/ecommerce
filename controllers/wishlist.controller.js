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

module.exports = {
  addToWishlist,
};
