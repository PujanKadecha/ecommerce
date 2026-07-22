const authService = require("../services/auth.services");

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const result = await authService.refreshAccessToken(req.body.refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.body.refreshToken);

    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const logoutAll = async (req, res, next) => {
  try {
    await authService.logoutAll(req.user._id);

    res.status(200).json({
      success: true,
      message: "Logged Out from all Devices",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  logoutAll,
};
