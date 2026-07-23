const errorHandler = (err, req, res, next) => {
  const multer = require("multer");

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Image size must not exceed 2 MB",
      });
    }
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  if (err.message === "Only JPG, JPEG, PNG and WEBP images are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
