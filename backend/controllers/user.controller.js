const userService = require("../services/user.services");

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await userService.getCurrentUser(req.user);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user._id, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    await userService.changePassword(
      req.user._id,
      req.body.currentPassword,
      req.body.newPassword,
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully. Please login again.",
    });
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const user = await userService.uploadAvatar(req.user._id, req.file);

    res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    await userService.deleteAccount(req.user._id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUser,
  updateProfile,
  changePassword,
  uploadAvatar,
  deleteAccount
};
