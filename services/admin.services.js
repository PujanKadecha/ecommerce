const User = require("../models/user.model");

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

module.exports = {
  getAllUsers,
  getUserById,
};
