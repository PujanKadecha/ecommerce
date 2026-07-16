const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/password");
const { uploadImage, deleteImage } = require("../utils/cloudinary");

const getCurruntUser = async (user) => {
  return user;
};

const updateProfile = async (userId, updateData) => {
  const allowedFields = ["firstName", "lastName", "phone"];

  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  const user = await User.findByIdAndUpdate(userId, filteredData, {
    returnDocument: "after",
    runValidators: true,
  }).select("-password");
  return user;
};

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await comparePassword(currentPassword, user.password);

  if (!isMatch) {
    const error = new Error("Current password is incorrect");
    error.statusCode = 400;
    throw error;
  }

  const isSamePassword = await comparePassword(newPassword, user.password);

  if (isSamePassword) {
    const error = new Error(
      "New password must be different from the current password",
    );
    error.statusCode = 400;
    throw error;
  }

  user.password = await hashPassword(newPassword);

  user.refreshTokens = [];

  await user.save();

  return;
};

const uploadAvatar = async (userId, file) => {
  if (!file) {
    const error = new Error("Please upload an image");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.avatar.publicId) {
    await deleteImage(user.avatar.publicId);
  }

  const uploadedImage = await uploadImage(file.buffer, "ecommerce/users");

  user.avatar = {
    url: uploadedImage.secure_url,
    publicId: uploadedImage.public_id,
  };

  await user.save();

  return user;
};

module.exports = {
  getCurruntUser,
  updateProfile,
  changePassword,
  uploadAvatar,
};
