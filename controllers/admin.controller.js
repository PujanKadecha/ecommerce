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

module.exports = { 
    getAllUsers,
    getUserById
};
