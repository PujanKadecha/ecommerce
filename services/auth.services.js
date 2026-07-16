const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateAccessToken, generateRefreshToken } = require("../config/jwt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { refreshToken } = require("../controllers/auth.controller");

const register = async (userData) => {
  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(userData.password);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

const login = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);

  user.refreshTokens.push({
    token: refreshToken,
  });

  await user.save();

  const userObject = user.toObject();

  delete userObject.password;

  return {
    user: userObject,
    accessToken,
    refreshToken,
  };
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Refresh token required");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(refreshToken, env.refreshSecret);

  const user = await User.findById(decoded.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  const tokenExists = user.refreshTokens.some(
    (item) => item.token === refreshToken,
  );

  if (!tokenExists) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user);

  return {
    accessToken,
  };
};

const logout = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, env.refreshSecret);

  const user = await User.findById(decoded.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  user.refreshTokens = user.refreshTokens.filter(
    (item) => item.token !== refreshToken,
  );

  await user.save();

  return;
};

const logoutAll = async(userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  user.refreshTokens = [];

  await user.save();

  return;
}

module.exports = {
  register,
  login,
  refreshAccessToken,
  logout,
  logoutAll
};
