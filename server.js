const dotenv = require("dotenv");
dotenv.config();
const env = require("./config/env");

const connectDB = require("./config/db");
const User = require ("./models/user.model");

const app = require("./app");

const PORT = env.port || 5000;


console.log(User.modelName);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
