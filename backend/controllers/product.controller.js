const productServices = require("../services/product.services");
const redisClient = require("../config/redis");

const createProduct = async (req, res, next) => {
  try {
    const product = await productServices.createProduct(req.body, req.user._id);

    await clearProductCache();

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

    const responsePayload = {
      success: true,
      message: "Product Fetched Successfully",
      data: result.products,
      pagination: result.pagination,
    };

    const cacheKey = `product:${req.orignalUrl || "all"}`;
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(responsePayload));

    res.status(200).json(responsePayload);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productServices.getProductById(req.params.id);

    const responsePayload = {
      success: true,
      message: "Product Fetched Successfully",
      data: product,
    };

    const cacheKey = `products:${req.originalUrl}`;
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(responsePayload));

    res.status(200).json(responsePayload);
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

    await clearProductCache();

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

    await clearProductCache();

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

    await clearProductCache();

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

    await clearProductCache();

    res.status(200).json({
      success: true,
      message: "Product Image removed Successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

async function clearProductCache() {
  try {
    const keys = await redisClient.keys("products:*");
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log("cleared all product caches");
    }
  } catch (err) {
    console.log("Failed to clear cache:", err);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  removeProductImage,
};
