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
const { AppError, catchAsync } = require("../../utils/helpers");
const { pmcConf } = require("../../utils/configs");
const {
  invalidPmcID,
  userRegistered,
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
exports.registerDoctor = catchAsync(async (req, res, next) => {
  req.body.avatar = req.file.filename;
  const {
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
  } = req.body;

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
