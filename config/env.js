module.exports = {
  nodeEnv: process.env.NODE_ENV,

  port: process.env.PORT,

  apiVersion: process.env.API_VERSION,

  clientUrl: process.env.CLIENT_URL,

  mongoUri: process.env.MONGO_URI,

  accessSecret: process.env.JWT_ACCESS_SECRET,
  accessExpires: process.env.JWT_ACCESS_EXPIRES,

  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpires: process.env.JWT_REFRESH_EXPIRES,

  redis: {
    url: process.env.REDIS_URL,
  },

  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },

  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,

  cookie: {
    secret: process.env.COOKIE_SECRET,
    expires: process.env.COOKIE_EXPIRES,
  },
};
