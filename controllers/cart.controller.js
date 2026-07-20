const cartServices = require("../services/cart.services");

const addToCart = async (req, res, next) => {
  try {
    const cart = await cartServices.addToCart(req.user._id, req.body);

    res.status(200).json({
      success: true,
      message: "Product Added to Cart",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const getMyCart = async (req, res, next) => {
  try {
    const cart = await cartServices.getMyCart(req.user._id);

    res.status(200).json({
      success: true,
      message: "Cart Fetched Successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  getMyCart,
};
