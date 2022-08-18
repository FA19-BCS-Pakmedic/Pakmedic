// npm modules import
const path = require("path");
const express = require("express");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// importing utils
const AppError = require("./app/utils/helpers/appError");

// importing controllers
const globalErrorHandler = require("./app/controllers/errorController");

// importing routers
const authRoute = require("./app/routes/auth/authRoute");
const patientRoute = require("./app/routes/api/patientRoutes");

// Start express app
const app = express();

app.enable("trust proxy");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());

app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Compress all responses
app.use(compression());

// file upload middleware
// app.use(fileUpload());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// Api endpoints
app.use("/auth", authRoute);
app.use("/api/v1/patient", patientRoute);

// any irrelavant end point will hit this and throw error
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

console.log("Imports work");
