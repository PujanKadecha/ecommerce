const User = require("../models/user.model");
const { deleteImage } = require("../utils/cloudinary");

const getAllUsers = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = query.search || "";
  const sort = query.sort || "createdAt";
  const order = query.order === "asc" ? 1 : -1;
  const filter = {};

  if (search) {
    filter.$or = [
      {
        firstName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const users = await User.find(filter)
    .select("-password -refreshTokens")
    .sort({
      [sort]: order,
    })
    .skip(skip)
    .limit(limit);

  const totalUsers = await User.countDocuments(filter);

  return {
    users,
    pagination: {
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      limit,
    },
  };
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshTokens");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;

    throw error;
  }

  return user;
};

const updateUserRole = async (adminId, userId, role) => {
  if (adminId.toString() === userId) {
    const error = new Error("You cannot change your own role");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    {
      new: true,
      runValidators: true,
    },
  ).select("-password -refreshTokens");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const deleteUser = async (adminId, userId) => {
  if (adminId.toString() === userId) {
    const error = new Error("You cannot Delete your own role");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.avatar?.publicId) {
    await deleteImage(user.avatar.publicId);
  }
  await User.findByIdAndDelete(userId);
  return;
};

const getDashboardStatus = async () => {
  const totalUsers = await User.countDocuments();

  const customers = await User.countDocuments({
    role: "customer",
  });

  const sellers = await User.countDocuments({
    role: "seller",
  });

  const admins = await User.countDocuments({
    role: "admin",
  });

  const verifiedUsers = await User.countDocuments({
    isVerified: true,
  });

  const unverifiedUsers = await User.countDocuments({
    isVerified: false,
  });

  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  const newUsersThisMonth = await User.countDocuments({
    createdAt: {
      $gte: firstDayOfMonth,
    },
  });

  return {
    totalUsers,
    customers,
    sellers,
    admins,
    verifiedUsers,
    unverifiedUsers,
    newUsersThisMonth,
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getDashboardStatus
};
