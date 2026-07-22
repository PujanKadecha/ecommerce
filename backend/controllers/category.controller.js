const categoryService = require("../services/category.services");

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(
      req.body,
      req.user._id,
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const result = await categoryService.getAllCategory(req.query);

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: result.categories,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category fetched Successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategoty = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategoty(
      req.params.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);

    res.status(200).json({
      success: true,
      message: "Categoty Deleted Successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const uploadCategoryImage = async (req, res, next) => {
  try {
    const category = await categoryService.uploadCategoryImage(
      req.params.id,
      req.file,
    );

    res.status(200).json({
      success: true,
      message: "Category Image Uploaded",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategoryImage = async (req, res, next) => {
  try {
    const category = await categoryService.deleteCategoryImage(req.params.id);

    res.status(200).json({
      success: true,
      message: "Categoty Image Deleted",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoty,
  deleteCategory,
  uploadCategoryImage,
  deleteCategoryImage
};
