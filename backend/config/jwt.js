const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    env.accessSecret,
    {
      expiresIn: env.accessExpires,
    },
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    env.refreshSecret,
    {
      expiresIn: env.refreshExpires,
    },
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
