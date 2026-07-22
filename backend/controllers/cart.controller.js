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

const updateCartItem = async (req, res, next) => {
  try {
    const cart = await cartServices.updateCartItem(
      req.user._id,
      req.params.itemId,
      req.body.quantity,
    );

    res.status(200).json({
      success: true,
      message: "Cart Updated Successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const cart = await cartServices.removeCartItem(
      req.user._id,
      req.params.itemId,
    );

    res.status(200).json({
      success: true,
      message: "Cart Updated Successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await cartServices.clearCart(req.user._id);

    res.status(200).json({
      success: true,
      message: "Cart Clear Successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
