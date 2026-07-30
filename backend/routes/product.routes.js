const express = require("express");
const productController = require("../controllers/product.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const validate  = require("../middleware/validation.middleware");
const { checkCache } = require("../middleware/redis.middleware");
const {
  createProductSchema,
  productIdSchema,
  updateProductSchema,
} = require("../validators/product.validator");
const router = express.Router();
const {uploadProductImages} = require("../middleware/upload.middleware");


router.post(
  "/",
  authenticate,
  authorize("admin", "seller"),
  validate(createProductSchema),
  productController.createProduct,
);

router.get("/", checkCache(), productController.getAllProducts);

router.get(
  "/:id",
  checkCache(),
  validate(productIdSchema, "params"),
  productController.getProductById,
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin", "seller"),
  validate(productIdSchema, "params"),
  validate(updateProductSchema),
  productController.updateProduct,
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin", "seller"),
  validate(productIdSchema, "params"),
  productController.deleteProduct,
);

router.post(
    "/:id/images",
    authenticate,
    authorize("admin","seller"),
    validate(productIdSchema,"params"),
    uploadProductImages,
    productController.uploadProductImages
);

router.delete(
    "/:productId/images/:imageId",
    authenticate,
    authorize("admin","seller"),
    productController.removeProductImage
);

module.exports = router;