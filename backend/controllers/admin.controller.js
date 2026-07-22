const adminService = require("../services/admin.services");

const getAllUsers = async (req, res, next) => {
  try {
    const result = await adminService.getAllUsers(req.query);

    res.status(200).json({
      success: true,
      message: "Users Fetched successfully",
      data: result.users,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await adminService.getUserById(req.params.id);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const user = await adminService.updateUserRole(
      req.user._id,
      req.params.id,
      req.body.role,
    );

    res.status(200).json({
      success: true,
      message: "User role updated Successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await adminService.deleteUser(req.user._id, req.params.id);

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardStatus = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStatus();

    res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getDashboardStatus
};
