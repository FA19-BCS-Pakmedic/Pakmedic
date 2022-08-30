//npm packages import
const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
// const { promisify } = require("util");
const bcrypt = require("bcrypt");
// const formidable = require("formidable");
const { validationResult } = require("express-validator");
const fetch = require("node-fetch");

// importing utils
const {
  AppError,
  catchAsync,
  createSendToken,
  matchEncryptions,
  sendMail,
  getConfCodeEmailTemplate,
} = require("../../utils/helpers");
const { pmcConf } = require("../../utils/configs");
const {
  invalidPmcID,
  userRegistered,
  provideEmailPassword,
  incorrectEmailPassword,
  tokenExpiry,
  passwordUpdateSuccess,
  tokenExpired,
  invalidToken,
} = require("../../utils/constants/RESPONSEMESSAGES");

//importing models
const db = require("../../models");
const Doctor = db.doctor;

// method to verify the doctor PMC id and return pmc data to the client
exports.verifyDoctor = catchAsync(async (req, res, next) => {
  const { pmcID } = req.body;
  if (!pmcID) {
    return next(new AppError(invalidPmcID, 400));
  }
  const sendData = {
    RegistrationNo: pmcID,
  };
  //   making a post request to the pmc backend to fetch the doctor data
  const response = await fetch(pmcConf.pmcEndPoint, {
    method: "POST",
    body: JSON.stringify(sendData),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (data.status == true) {
    return res.status(200).json({
      status: "success",
      data: data.data,
      message: data.message,
    });
  } else {
    console.log(data);

    return next(new AppError(data.message, 400));
  }
});

// method to register the doctor
exports.register = catchAsync(async (req, res, next) => {
  req.body.avatar = req.file.filename;

  ({
    email,
    password,
    role,
    name,
    phone,
    dob,
    gender,
    location,
    avatar,
    pmcID,
    qualifications,
    issueDate,
    expiryDate,
    status,
    speciality,
  } = req.body);

  const doctor = new Doctor({
    email,
    password: bcrypt.hashSync(password, 10),
    role,
    name,
    phone,
    dob: new Date(dob),
    gender,
    location,
    avatar,
    pmc: {
      id: pmcID,
      qualifications,
      issueDate: new Date(issueDate),
      expiryDate: new Date(expiryDate),
      status,
    },
    speciality,
  });

  const data = await doctor.save();

  return res.status(201).json({
    status: "success",
    data: data,
    message: `Doctor ${userRegistered}`,
  });
});

// method to login the doctor
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(provideEmailPassword, 400));
  }
  const user = await Doctor.findOne({ email }).select("+password");

  console.log(user);

  // Check if user exists && password is correct
  if (!user || !(await matchEncryptions(password, user.password))) {
    return next(new AppError(incorrectEmailPassword, 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

/***********************************PASSWORD RESET FUNCITONALITY ********************************************/

// // method to send a verification token to the patient email (email functionality is yet to be implemented)
// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   // checking if there are any errors
//   const errors = validationResult(req);
//   if (errors.errors.length > 0) {
//     return next(new AppError(errors.array()[0].msg, 400));
//   }

//   const { email } = req.body;
//   const patient = await Doctor.findOne({ email });
//   if (!patient) {
//     return next(new AppError(`patient ${userNotFoundEmail}`, 404));
//   }
//   // create reset token and expiry
//   const resetPasswordToken =
//     crypto.randomBytes(20).toString("hex") + Date.now();
//   const resetPasswordExpiry = Date.now() + 600000; // 10 mins

//   // updating the patient data by adding token and expiry
//   const updatedDoctor = await Doctor.findOneAndUpdate(
//     { email },
//     { $set: { resetPasswordToken, resetPasswordExpiry } },
//     { new: true }
//   );
//   console.log(updatedDoctor);
//   res.status(200).json({
//     success: true,
//     resetToken: resetPasswordToken,
//     message: `${tokenExpiry} 10mins`,
//   });
// });

// method to send a verification token to the doctor email (email functionality is yet to be implemented)
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // checking if there are any errors
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const { email } = req.body;
  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    return next(new AppError(`doctor ${userNotFoundEmail}`, 404));
  }
  // create reset token and expiry
  const resetPasswordToken = Math.floor(1000 + Math.random() * 9000).toString();
  const resetPasswordExpiry = Date.now() + 600000; // 10 mins

  // getting a custom html template for confirmation code mail
  const htmlContent = getConfCodeEmailTemplate(resetPasswordToken);
  // console.log(htmlContent);
  const subject = "Confirmation Code";

  // send email to doctor
  await sendMail(email, doctor.name, htmlContent, subject);

  // update doctor fields and save
  doctor.resetPasswordToken = resetPasswordToken;
  doctor.resetPasswordExpiry = resetPasswordExpiry;

  const updatedDoctor = await doctor.save();

  // console.log(updatedPatient);
  res.status(200).json({
    success: true,
    resetToken: resetPasswordToken,
    message: `${tokenExpiry} 10mins`,
  });
});

// method to reset the password in case of forgetten password
exports.resetForgottenPassword = catchAsync(async (req, res, next) => {
  // checking if there are any errors
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const { resetPasswordToken, password } = req.body;
  const patient = await Doctor.findOne({ resetPasswordToken });

  // checking token validity
  if (!patient) {
    return next(new AppError(invalidToken, 400));
  }
  if (patient.resetPasswordExpiry < Date.now()) {
    return next(new AppError(tokenExpired, 400));
  }

  // updating password and token fields if the token is valid
  patient.password = bcrypt.hashSync(password, 10);
  patient.resetPasswordToken = undefined;
  patient.resetPasswordExpiry = undefined;
  await patient.save();
  res.status(200).json({
    success: true,
    message: passwordUpdateSuccess,
  });
});

//reset password if the patient is logged in
exports.resetPassword = catchAsync(async (req, res, next) => {
  // checking if there are any errors
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    return next(new AppError(errors.array()[0].msg, 400));
  }
  const { email, password, newPassword } = req.body;

  const patient = await Doctor.findOne({ email }).select("+password");
  if (!patient) {
    return next(new AppError(`Doctor ${userNotFoundEmail}`, 404));
  }
  if (!(await matchEncryptions(password, patient.password))) {
    return next(new AppError(incorrectPassword, 400));
  }
  patient.password = bcrypt.hashSync(newPassword, 10);
  await patient.save();
  res.status(200).json({
    success: true,
    message: passwordUpdateSuccess,
  });
});

/********************************************THIRD PARTY AUTHENTICATION FUNCTIONALITY  ******************************************/
//method to login/singup user using google their google account
exports.googleLogin = catchAsync(async (req, res, next) => {
  // const { credentials, role, password } = req.body;

  const { credentials } = req.body;

  // console.log(jwt_decode(credentials));

  const email = jwt_decode(credentials).email;

  console.log(email);

  // socialAuth(req, res, email, role, password);
  socialAuth(req, res, next, email);
});

//method to login/singup user using google auth
exports.facebookLogin = catchAsync(async (req, res, next) => {
  // const { accessToken, userID, role, password } = req.body;
  const { accessToken, userID } = req.body;
  console.log(accessToken, userID);

  // fetching the user data from facebook graph api using the userID and accessToken
  const facebookURL = `https://graph.facebook.com/v14.0/${userID}?fields=name,email&access_token=${accessToken}`;

  const response = await fetch(facebookURL);

  const data = await response.json();

  console.log(data);

  const email = data.email;

  // socialAuth(req, res, email, role, password);
  socialAuth(req, res, next, email);
});

// social login/signup method that is common for both google and facebook endpoints
const socialAuth = catchAsync(async (req, res, next, email, role, password) => {
  const user = await Patient.findOne({ email });

  // if client is already registered with the google account we will directly log them in and send an access token to the client
  // if (user) {
  //   return createSendToken(user, 200, req, res);
  // }

  if (!user) {
    return next(new AppError(`Patient ${userNotFoundEmail}`, 404));
  }

  createSendToken(user, 200, req, res);

  // // generating a random password if no password is provided from the client
  // if (!password) {
  //   password = crypto.randomBytes(10).toString("hex");
  // }

  // // if client is not registered with the google account we will register them
  // const newUser = new User({
  //   email,
  //   role,
  //   password: bcrypt.hashSync(password, 10),
  // });

  // await newUser.save();

  // res
  //   .status(200)
  //   .json({ status: "success", message: "user registered successfully" });
});
