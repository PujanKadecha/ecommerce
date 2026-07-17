const Product = require("../models/product.model");
const { deleteImage, uploadImage } = require("../utils/cloudinary");

const createProduct = async (productData, userId) => {
  const existingSlug = await Product.findOne({
    slug: productData.slug,
  });

  if (existingSlug) {
    const error = new Error("Product slug already exists");
    error.statusCode = 409;

    throw error;
  }

  const existingSku = await Product.findOne({
    sku: productData.sku,
  });

  if (existingSku) {
    const error = new Error("Product SKU already exists");
    error.statusCode = 409;

    throw error;
  }

  const product = await Product.create({
    ...productData,
    createdBy: userId,
  });

  return product;
};

const getAllProducts = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const sortField = query.sort || "createdAt";
  const sortOrder = query.order === "asc" ? 1 : -1;

  const filter = {
    status: "active",
  };

  if (query.category) {
    filter.category = query.category;
  }

  if (query.brand) {
    filter.brand = query.brand;
  }

  if (query.featured !== undefined) {
    filter.featured = query.featured === "true";
  }

  if (query.search) {
    filter.$or = [
      {
        name: {
          $regex: query.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: query.search,
          $options: "i",
        },
      },
      {
        brand: {
          $regex: query.search,
          $options: "i",
        },
      },
    ];
  }

  const products = await Product.find(filter)
    .populate("createdBy", "firstname lastname email")
    .sort({
      [sortField]: sortOrder,
    })
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments(filter);

  return {
    products,
    pagination: {
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      limit,
    },
  };
};

const getProductById = async (productId) => {
  const product = await Product.findOne({
    _id: productId,
    status: "active",
  }).populate("createdBy", "firstName lastName email");

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;

    throw error;
  }
  return product;
};

const updateProduct = async (productId, user, productData) => {
  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  if (
    user.role === "seller" &&
    product.createdBy.toString() !== user._id.toString()
  ) {
    const error = new Error("You are not authorized to update this product");
    error.statusCode = 403;
    throw error;
  }
  if (productData.slug && productData.slug !== product.slug) {
    const existingSlug = await Product.findOne({
      slug: productData.slug,
    });
    if (existingSlug) {
      const error = new Error("Product slug already exists");
      error.statusCode = 409;
      throw error;
    }
  }
  if (productData.sku && productData.sku !== product.sku) {
    const existingSku = await Product.findOne({
      sku: productData.sku,
    });
    if (existingSku) {
      const error = new Error("Product SKU already exists");
      error.statusCode = 409;
      throw error;
    }
  }
  Object.assign(product, productData);
  await product.save();
  return product;
};

const deleteProduct = async (productId, user) => {
  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  if (
    user.role === "seller" &&
    product.createdBy.toString() !== user._id.toString()
  ) {
    const error = new Error("You are not authorized to delete this product");
    error.statusCode = 403;
    throw error;
  }
  if (product.images.length) {
    for (const image of product.images) {
      if (image.publicId) {
        await deleteImage(image.publicId);
      }
    }
  }
  await Product.findByIdAndDelete(productId);
};

const uploadProductImages = async (productId, user, files) => {
  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  if (
    user.role === "seller" &&
    product.createdBy.toString() !== user._id.toString()
  ) {
    const error = new Error("You are not authorized");
    error.statusCode = 403;
    throw error;
  }
  const uploadedImages = [];
  for (const file of files) {
    const result = await uploadImage(file.buffer, "products");

    uploadedImages.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
  }
  product.images.push(...uploadedImages);
  await product.save();
  return product;
};

const removeProductImage = async (productId, imageId, user) => {
  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  if (
    user.role === "seller" &&
    product.createdBy.toString() !== user._id.toString()
  ) {
    const error = new Error("You are not authorized to modify this product");
    error.statusCode = 403;
    throw error;
  }
  const image = product.images.id(imageId);
  if (!image) {
    const error = new Error("Image not found");
    error.statusCode = 404;
    throw error;
  }
  await deleteImage(image.publicId);
  image.deleteOne();
  await product.save();
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  removeProductImage,
};
