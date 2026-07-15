const express = require("express"),
  helmet = require("helmet"),
  cors = require("cors"),
  coockieParser = require("cookie-parser"),
  comperation = require("compression"),
  morgon = require("morgan");

const app = express();

app.use(helmet());

app.use(cors({
    origin : process.env.CLIENT_URL,
    credential : true
}));

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use(coockieParser());

app.use(comperation());

app.use(morgon("dev"));

app.get("/api/health",(req,res)=> {
    res.status(202).json({
        success : true,
        message : "Server is Running"
    });
});

module.exports = app;