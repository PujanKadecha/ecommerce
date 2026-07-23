const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const validate = require("../middleware/validation.middleware");
const {
  addAddressSchema,
  updateAddressSchema,
  addressIdSchema,
} = require("../validators/address.validator");
const addressController = require("../controllers/address.controller");

router.post(
  "/",
  authenticate,
  authorize("customer"),
  validate(addAddressSchema),
  addressController.addAddress,
);

router.get(
  "/",
  authenticate,
  authorize("customer"),
  addressController.getAddress,
);

router.get(
  "/:id",
  authenticate,
  authorize("customer"),
  validate(addressIdSchema, "params"),
  addressController.getAddressById,
);

router.patch(
  "/:id",
  authenticate,
  authorize("customer"),
  validate(addressIdSchema, "params"),
  validate(updateAddressSchema),
  addressController.updateAddress,
);

router.delete(
  "/:id",
  authenticate,
  authorize("customer"),
  validate(addressIdSchema, "params"),
  addressController.deleteAddress,
);

router.patch(
  "/:id/default",
  authenticate,
  authorize("customer"),
  validate(addressIdSchema, "params"),
  addressController.setDefaultAddress,
);

module.exports = router;
