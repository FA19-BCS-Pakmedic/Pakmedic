const db = require("../models");
const AppError = require("../utils/helpers/appError");
const catchAsync = require("../utils/helpers/catchAsync");
const deleteFile = require("../utils/helpers/deleteFile");

const ROLES = require("../utils/constants/ROLES");

// function to check if there are users with the same email or cnic
module.exports = catchAsync(async (req, res, next) => {
  const { email, cnic, role } = req.body;
  let user;

  if (role === Object.values(ROLES)[0]) {
    const Patient = db.patient;
    user = await Patient.findOne({ $or: [{ email }, { cnic }] });
    if (user) {
      deleteFile(req.file.path);
      return next(
        new AppError("This email or cnic is already registered", 409)
      );
    }
  } else {
    return next(new AppError("Invalid role", 404));
  }

  next();
});
