const mongoose = require("mongoose");

const { requiredError } = require("../utils/constants/RESPONSEMESSAGES");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `${requiredError} name`],
  },
  compound: {
    type: String,
    required: [true, `${requiredError} compound`],
  },
  dosage_form: {
    type: String,
    required: [true, `${requiredError} dosage form`],
  },
  dosage_frequency: {
    type: Number,
    required: [true, `${requiredError} dosage frequency`],
  },
  dosage_size: {
    type: Number,
    required: [true, `${requiredError} dosage size`],
  },
  duration: {
    type: Number,
    required: [true, `${requiredError} duration`],
  },
  add_duration: {
    type: Number,
    required: [true, `${requiredError} add duration`],
  },
  precaution: {
    type: String,
    required: [true, `${requiredError} precaution`],
  },
});

module.exports = mongoose.model(`Medicine`, medicineSchema);
