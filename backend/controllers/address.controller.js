const addressServices = require("../services/address.services");

const addAddress = async (req, res, next) => {
  try {
    const address = await addressServices.addAddress(req.user._id, req.body);

    res.status(200).json({
      success: true,
      message: "Address Added Successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const getAddress = async (req, res, next) => {
  try {
    const address = await addressServices.getAddress(req.user._id);

    res.status(200).json({
      success: true,
      message: "Address Fetched Successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const getAddressById = async (req, res, next) => {
  try {
    const address = await addressServices.getAddressById(
      req.user._id,
      req.params.id,
    );

    res.status(200).json({
      success: true,
      message: "Address Fetched Successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const address = await addressServices.updateAddress(
      req.user._id,
      req.params.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Address Updated Successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const address = await addressServices.deleteAddress(
      req.user._id,
      req.params.id,
    );

    res.status(200).json({
      success: true,
      message: "Address Deleted Successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const setDefaultAddress = async (req, res, next) => {
  try {
    const address = await addressServices.setDefaultAddress(
      req.user._id,
      req.params.id,
    );

    res.status(200).json({
      success: true,
      message: "Default Address set Successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAddress,
  getAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
