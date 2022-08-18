const mongoose = require("mongoose");

const CITIES = require("../utils/constants/CITIES");
const ROLES = require("../utils/constants/ROLES");
const GENDERS = require("../utils/constants/GENDERS");

const pmcSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please enter a pmcID"],
  },
  qualifications: {
    type: [String],
  },
  issueDate: {
    type: Date,
    required: [true, "Please enter a issueDate"],
    default: Date.now(),
  },
  expiryDate: {
    type: Date,
    required: [true, "Please enter a expiryDate"],
    default: Date.now(),
  },
  status: {
    type: String,
    required: [true, "Please enter a status"],
  },
});

const doctorSchema = mongoose.Schema({
  //authentication data
  email: {
    type: String,
    required: [true, "Please enter an email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  role: {
    type: String,
    required: [true, "Please enter a role"],
    enum: Object.values(ROLES),
  },

  //pmc data
  pmc: {
    type: pmcSchema,
    required: [true, "Please enter your pmc details"],
  },

  //general information
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  phone: {
    type: String,
    required: [true, "Please enter a phone number"],
  },
  dob: {
    type: Date,
    required: [true, "Please enter a date of birth"],
  },
  gender: {
    type: String,
    required: [true, "Please enter your gender"],
    enum: Object.values(GENDERS),
  },
  location: {
    type: String,
    required: [true, "Please enter a location"],
    enum: Object.values(CITIES),
  },
  avatar: {
    type: String,
    required: [true, "Please enter an avatar"],
  },

  //doctor specific information
  specialty: {
    type: String,
    required: [true, "Please enter a specialty"],
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

  // registration date
  registeredOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
