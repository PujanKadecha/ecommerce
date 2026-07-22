const productServices = require("../services/product.services");

const createProduct = async (req, res, next) => {
  try {
    const product = await productServices.createProduct(req.body, req.user._id);

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const result = await productServices.getAllProducts(req.query);

    res.status(200).json({
      success: true,
      message: "Products fetched Successfully",
      data: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productServices.getProductById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product Fetched Successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await productServices.updateProduct(
      req.params.id,
      req.user._id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await productServices.deleteProduct(req.params.id, req.user);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const uploadProductImages = async (req, res, next) => {
  try {
    const product = await productServices.uploadProductImages(
      req.params.id,
      req.user,
      req.files,
    );
    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const removeProductImage = async (req, res, next) => {
  try {
    const product = await productServices.removeProductImage(
      req.params.productId,
      req.params.imageId,
      req.user,
    );

    res.status(200).json({
      success: true,
      message: "Product Image removed Successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  removeProductImage
};
