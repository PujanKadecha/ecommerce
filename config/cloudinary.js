const { v2 : cloudinary } = require("cloudinary");

const env = require("./env");

cloudinary.config({
    cloud_name : env.cloudName,
    api_key:env.apiKey,
    api_secret:env.apiSecret
});

module.exports = cloudinary;