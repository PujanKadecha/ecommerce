const userService = require("../services/user.services");

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await userService.getCurruntUser(req.user);

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
module.exports = {
  getCurrentUser,
  updateProfile,
};
