const User = require("../models/user.model");

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

module.exports = {
  getCurruntUser,
  updateProfile,
};
