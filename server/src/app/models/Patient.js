const mongoose = require("mongoose");

const ROLES = require("../utils/constants/ROLES");
const GENDERS = require("../utils/constants/GENDERS");
const BLOODTYPES = require("../utils/constants/BLOODTYPES");

const biologicalSchema = mongoose.Schema({
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  bloodType: {
    type: String,
    enum: Object.values(BLOODTYPES),
  },
});

const medicalSchema = mongoose.Schema({
  allergies: {
    type: [String],
  },
  surgeries: {
    type: [String],
  },
  geneticDiseases: {
    type: [String],
  },
});

const patientSchema = mongoose.Schema({
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

  // general data
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
  cnic: {
    type: String,
    required: [true, "Please enter your cnic"],
  },
  address: {
    // replace with address reference
    type: String,
    required: [true, "Please enter your address"],
  },
  avatar: {
    type: String,
  },

  //   biological data e.g. weight, height, bloodtype
  bio: {
    type: biologicalSchema,
  },

  // medical data e.g. allergies, medications, surgeries, conditions, etc.
  medical: {
    type: medicalSchema,
  },

  //   patient specific data
  communities: {
    //replace with community refernce
    type: [String],
  },
  reminders: {
    //replace with reminder reference
    type: [String],
  },
  familyMembers: {
    //replace with family refernce
    type: [String],
  },

  // patient EHRs
  scans: {
    //replace with scans refernce
    type: [String],
  },
  prescriptions: {
    //replace with prescriptions refernce
    type: [String],
  },
  reports: {
    //replace with reports refernce
    type: [String],
  },

  //password reset related fields
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpiry: {
    type: Date,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
