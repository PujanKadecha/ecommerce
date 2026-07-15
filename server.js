const express = require("express"),
  helmet = require("helmet"),
  cors = require("cors"),
  coockieParser = require("cookie-parser"),
  comperation = require("compression"),
  morgon = require("morgan");

const app = express();

app.use(helmet());

app.cors({
    origin : process.env.CLIENT_URL,
    credential : true
});

