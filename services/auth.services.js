const User = require("../models/user.model");

const register = async (userData) => {
  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create(userData);

  return user;
};

module.exports = {
  register,
};
