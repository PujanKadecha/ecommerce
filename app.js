const express = require("express"),
  helmet = require("helmet"),
  cors = require("cors"),
  coockieParser = require("cookie-parser"),
  comperation = require("compression"),
  morgon = require("morgan"),
  env = require("./config/env"),
  errorHandler = require("./middleware/error.middleware"),
  notFound = require ("./middleware/notFound.middleware"),
  globalLimitter = require("./middleware/ratelimitter.middleware");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.clientUrl,
    credential: true,
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(coockieParser());

app.use(globalLimitter);

app.use(comperation());

app.use(morgon("dev"));

app.get("/api/health", (req, res) => {
  res.status(202).json({
    success: true,
    message: "Server is Running",
  });
});

app.use(notFound);

app.use(errorHandler);

module.exports = app;
