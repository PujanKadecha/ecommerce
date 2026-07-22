const dotenv = require("dotenv");
dotenv.config();
const env = require("./config/env");

const connectDB = require("./config/db");

const app = require("./app");

const PORT = env.port || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();