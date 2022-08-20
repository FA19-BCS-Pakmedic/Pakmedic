const mongoose = require("mongoose");

const CITIES = require("../utils/constants/CITIES");
const ROLES = require("../utils/constants/ROLES");
const GENDERS = require("../utils/constants/GENDERS");
const { requiredError } = require("../utils/constants/RESPONSEMESSAGES");

const pmcSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, `${requiredError} pmcID`],
  },
  qualifications: {
    type: [String],
    required: [true, `${requiredError} qualifications`],
  },
  issueDate: {
    type: Date,
    required: [true, `${requiredError} issueDate`],
    default: Date.now(),
  },
  expiryDate: {
    type: Date,
    required: [true, `${requiredError} expiryDate`],
    default: Date.now(),
  },
  status: {
    type: String,
    required: [true, `${requiredError} status`],
  },
});

const doctorSchema = mongoose.Schema({
  //authentication data
  email: {
    type: String,
    required: [true, `${requiredError} email`],
  },
  password: {
    type: String,
    required: [true, `${requiredError} password`],
    select: false,
  },
  role: {
    type: String,
    required: [true, `${requiredError} role`],
    enum: Object.values(ROLES),
  },

  //general information
  name: {
    type: String,
    required: [true, `${requiredError} name`],
  },
  phone: {
    type: String,
    required: [true, `${requiredError} phone number`],
  },
  dob: {
    type: Date,
    required: [true, `${requiredError} date of birth`],
  },
  gender: {
    type: String,
    required: [true, `${requiredError} gender`],
    enum: Object.values(GENDERS),
  },
  location: {
    type: String,
    required: [true, `${requiredError} location`],
    enum: Object.values(CITIES),
  },
  avatar: {
    type: String,
    required: [true, `${requiredError} avatar`],
  },

  //pmc data
  pmc: {
    type: pmcSchema,
    required: [true, `${requiredError} pmc details`],
  },

  //doctor specific information
  specialty: {
    type: String,
    required: [true, `${requiredError} specialty`],
  },
  about: {
    type: String,
  },
  experiences: {
    type: [String],
  },
  treatments: {
    type: [String],
  },
  services: {
    type: [String],
  },
  eSign: {
    type: String,
  },
  communities: {
    type: [String],
  },
  reviews: {
    type: [String],
  },

  //account verification
  isVerified: {
    type: Boolean,
    default: false,
  },

  //password reset related fields
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpiry: {
    type: Date,
  },

  // registration date
  registeredOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(`Doctor`, doctorSchema);
