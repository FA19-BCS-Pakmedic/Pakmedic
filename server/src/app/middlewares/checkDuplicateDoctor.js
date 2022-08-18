const db = require("../models");
const AppError = require("../utils/helpers/appError");
const catchAsync = require("../utils/helpers/catchAsync");

const ROLES = require("../utils/constants/ROLES");

// function to check if there are users with the same email or pmc id
module.exports = catchAsync(async (req, res, next) => {
  const { email, pmc, role } = req.body;
  const { id } = pmc;
  let user;

  if (role === Object.values(ROLES)[0]) {
    const Doctor = db.doctor;
    user = await Doctor.findOne({ $or: [{ email }, { id }] });
    if (user) {
      return next(
        new AppError("This email or PMC id is already registered", 409)
      );
    }
  } else {
    return next(new AppError("Invalid role", 404));
  }

  next();
});
