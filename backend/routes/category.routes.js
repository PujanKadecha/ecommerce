const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const  validate  = require("../middleware/validation.middleware");
const uploadCategoryImage = require("../middleware/category.upload.middleware");
const {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} = require("../validators/category.validator");

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createCategorySchema),
  categoryController.createCategory,
);

router.get("/", categoryController.getAllCategory);

router.get(
  "/:id",
  validate(categoryIdSchema, "params"),
  categoryController.getCategoryById,
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(categoryIdSchema, "params"),
  validate(updateCategorySchema),
  categoryController.updateCategoty,
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(categoryIdSchema, "params"),
  categoryController.deleteCategory,
);

router.post("/:id/image",
  authenticate,
  authorize("admin"),
  validate(categoryIdSchema,"params"),
  uploadCategoryImage,
  categoryController.uploadCategoryImage
)

router.delete("/:id/image",
  authenticate,
  authorize("admin"),
  validate(categoryIdSchema,"params"),
  categoryController.deleteCategoryImage
)

module.exports = router;
