const Category = require("../models/category.model");
const { deleteImage, uploadImage } = require("../utils/cloudinary");
const Product = require("../models/product.model");

const createCategory = async (categoryData, userId) => {
  const existingName = await Category.findOne({
    name: categoryData.name,
  });

  if (existingName) {
    const error = new Error("Category name already exists");
    error.statusCode = 409;
    throw error;
  }

  const existingSlug = await Category.findOne({
    slug: categoryData.slug,
  });

  if (existingSlug) {
    const error = new Error("Category slug already exists");
    error.statusCode = 409;
    throw error;
  }

  if (categoryData.parent) {
    const parentCategory = await Category.findById(categoryData.parent);
    if (!parentCategory) {
      const error = new Error("Parent category not found");
      error.statusCode = 404;
      throw error;
    }
  }

  const category = await Category.create({
    ...categoryData,
    createdBy: userId,
  });

  return category;
};

const getAllCategory = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = {};

  if (query.search) {
    filter.name = {
      $regex: query.search,
      $options: "i",
    };
  }
  if (query.status) {
    filter.status = query.status;
  }
  const sort = {};
  if (query.sortBy) {
    sort[query.sortBy] = query.order === "asc" ? 1 : -1;
  } else {
    sort.createdAt = -1;
  }
  const categories = await Category.find(filter)
    .populate("parent", "name slug")
    .populate("createdBy", "firstName lastName email")
    .sort(sort)
    .skip(skip)
    .limit(limit);
  const totalCategories = await Category.countDocuments(filter);
  return {
    categories,
    pagination: {
      total: totalCategories,
      page,
      limit,
      totalPages: Math.ceil(totalCategories / limit),
    },
  };
};

const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId)
    .populate("parent", "name slug")
    .populate("createdBy", "firstName lastName email");

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;

    throw error;
  }

  return category;
};

const updateCategory = async (categoryId, categoryData) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  if (categoryData.name && categoryData.name !== category.name) {
    const existingName = await Category.findOne({
      name: categoryData.name,
    });
    if (existingName) {
      const error = new Error("Category name already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  if (categoryData.slug && categoryData.slug !== category.slug) {
    const existingSlug = await Category.findOne({
      slug: categoryData.slug,
    });

    if (existingSlug) {
      const error = new Error("Category slug already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  if (categoryData.parent) {
    if (categoryData.parent === categoryId) {
      const error = new Error("Category cannot be its own parent");
      error.statusCode = 400;

      throw error;
    }
    const parentCategory = await Category.findById(categoryData.parent);
    if (!parentCategory) {
      const error = new Error("Parent category not found");
      error.statusCode = 404;

      throw error;
    }
  }

  Object.assign(category, categoryData);
  await category.save();
  return category;
};

const deleteCategory = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  const childCategory = await Category.findOne({
    parent: categoryId,
  });

  if (childCategory) {
    const error = new Error("Cannot delete category with child categories");
    error.statusCode = 400;
    throw error;
  }

  const productExists = await Product.exists({
    category: categoryId,
  });

  if (productExists) {
    const error = new Error(
      "Cannot delete category because products are assigned to it",
    );
    error.statusCode = 400;
    throw error;
  }
  if (category.image?.publicId) {
    await deleteImage(category.image.publicId);
  }
  await Category.findByIdAndDelete(categoryId);
};

const uploadCategoryImage = async (categoryId, file) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    const error = new Error("Category not Found");
    error.statusCode = 404;
    throw error;
  }
  if (!file) {
    const error = new Error("Image is Required");
    error.statusCode = 400;
    throw error;
  }
  if (category.image?.publicId) {
    await deleteImage(category.image.publicId);
  }
  const uploadedImage = await uploadImage(file.buffer, "categories");
  category.image = {
    url: uploadedImage.secure_url,
    publicId: uploadedImage.public_id,
  };
  await category.save();
  return category;
};

const deleteCategoryImage = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    const error = new Error("Category not Found");
    error.statusCode = 404;
    throw error;
  }

  if (!category.image?.publicId) {
    const error = new Error("Category does not have an image");
    error.statusCode = 400;
    throw error;
  }

  await deleteImage(category.image.publicId);

  category.image = {
    url: "",
    publicId: "",
  };
  await category.save();
  return category;
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  deleteCategoryImage
};
