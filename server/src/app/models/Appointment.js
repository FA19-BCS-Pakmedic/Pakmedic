const mongoose = require("mongoose");

const { requiredError } = require("../utils/constants/RESPONSEMESSAGES");

const appointmentSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: [true, `${requiredError} patient id`],
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: [true, `${requiredError} doctor id`],
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: [true, `${requiredError} service id`],
  },
  appoint_date: {
    type: Date,
    required: [true, `${requiredError} appointment date`],
  },
  appoint_time: {
    type: String,
    required: [true, `${requiredError} appointment time`],
  },
  is_paid: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
  patient_note: {
    type: String,
  },
  reject_reason: {
    type: String,
  },
});

module.exports = mongoose.model(`Appointment`, appointmentSchema);
