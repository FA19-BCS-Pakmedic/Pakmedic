const db = require("../models");
const AppError = require("../utils/helpers/appError");
const catchAsync = require("../utils/helpers/catchAsync");
const User = db.user;

// function to check if there are users with the same email
exports.checkDuplicateUser = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new AppError("This email is already registered", 409));
  }
  next();
});
