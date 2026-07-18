const Category = require("../models/category.model");

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

    if(!category){
         const error = new Error("Category not found");
        error.statusCode = 404;

        throw error;
    }

    return category;
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById
};
