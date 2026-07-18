const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const {validate} = require("../middleware/validation.middleware");
const {createCategorySchema,categoryIdSchema} = require("../validators/category.validator");


router.post("/",
    authenticate,
    authorize("admin"),
    validate(createCategorySchema),
    categoryController.createCategory
)

router.get("/",categoryController.getAllCategory);

router.get("/:id",validate(categoryIdSchema,"params"),categoryController.getCategoryById);

module.exports = router;