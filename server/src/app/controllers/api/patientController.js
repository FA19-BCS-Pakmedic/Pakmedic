//npm packages import
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const formidable = require("formidable");
const { validationResult } = require("express-validator");

//importing utils
const catchAsync = require("../../utils/helpers/catchAsync");
const AppError = require("../../utils/helpers/appError");
const deleteFile = require("../../utils/helpers/deleteFile");
const jwtConfig = require("../../utils/configs/jwtConfig");
const matchEncryptions = require("../../utils/helpers/matchEncryptions");

//importing models
const db = require("../../models");
const Patient = db.patient;

// method to sign up patient
exports.register = catchAsync(async (req, res, next) => {
  req.body.avatar = req.file.filename;

  // checking if there are any errors
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    deleteFile(req.file.path);
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const {
    email,
    password,
    role,
    name,
    phone,
    dob,
    gender,
    cnic,
    address,
    height,
    weight,
    bloodType,
    avatar,
    resetPasswordToken,
    resetPasswordExpiry,
  } = req?.body;

  const patient = new Patient({
    email,
    password: bcrypt.hashSync(password, 10),
    role,
    name,
    phone,
    dob: new Date(dob),
    gender,
    cnic,
    address,
    avatar,
    bio: {
      height,
      weight,
      bloodType,
    },
    resetPasswordToken,
    resetPasswordExpiry,
  });

  await patient.save();

  // console.log(req.body);
  res.status(201).json({ success: true });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // console.table(req.body);

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await Patient.findOne({ email }).select("+password");

  console.log(user);

  // Check if user exists && password is correct
  if (!user || !(await matchEncryptions(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

exports.updatePatient = catchAsync(async (req, res, next) => {
  id = req.params.id;
  data = req.body;
  console.log(req.cookie);
  // console.log(id, data);

  // const patient = await Patient.findOne({ _id: id });
  // if (!patient) {
  //   return next(new AppError("No patient found with that email", 404));
  // }
  const updatedPatient = await Patient.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: updatedPatient,
  });
});

// method to get the patient details
exports.getPatient = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const patient = await Patient.findById(id);
  if (!patient) {
    return next(new AppError("No patient found with that id", 404));
  }
  res.status(200).json({
    success: true,
    data: patient,
  });
});

/***********************************PASSWORD RESET FUNCITONALITY ********************************************/
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const patient = await Patient.findOne({ email });
  if (!patient) {
    return next(new AppError("No patient found with that email", 404));
  }
  // create reset token
  const resetPasswordToken =
    crypto.randomBytes(20).toString("hex") + Date.now();
  const resetPasswordExpiry = Date.now() + 3600000; // 1 hour
  const updatedPatient = await Patient.findOneAndUpdate(
    { email },
    { $set: { resetPasswordToken, resetPasswordExpiry } },
    { new: true }
  );
  console.log(updatedPatient);
  res.status(200).json({
    success: true,
    resetToken: resetPasswordToken,
    message: "Your token will expire in 1 hour",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { resetPasswordToken, password } = req.body;
  const patient = await Patient.findOne({ resetPasswordToken });
  if (!patient) {
    return next(new AppError("Invalid token", 400));
  }
  if (patient.resetPasswordExpiry < Date.now()) {
    return next(new AppError("Token expired", 400));
  }
  patient.password = bcrypt.hashSync(password, 10);
  patient.resetPasswordToken = undefined;
  patient.resetPasswordExpiry = undefined;
  await patient.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

/***********************HELPER FUNCTIONS**********************************/

// method to send a token along with payload to user as a response to login request
const createSendToken = (user, statusCode, req, res) => {
  // create token
  const token = signToken(user);

  const data = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    gender: user.gender,
    phone: user.phone,
    dob: user.dob,
    cnic: user.cnic,
    address: user.address,
    bio: user.bio,
  };

  // creating a cookie to send back to the user
  res.cookie("jwt", token, {
    // maxAge: new Date(Date.now() + jwtConfig.expiresIn * 24 * 60 * 60 * 1000),
    maxAge: 2 * 60 * 60 * 1000,
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data,
  });
};

// method to sign the token along with the payload
const signToken = ({ _id, email, role }) => {
  return jwt.sign({ id: _id, email, role }, jwtConfig.accessSecret, {
    expiresIn: "1h",
  });
};

// // method to match passwords
// const matchEncryptions = async (encryption, storedEncryption) => {
//   return await bcrypt.compare(encryption, storedEncryption);
// };
