const mongoose = require("mongoose");

const { requiredError } = require("../utils/constants/RESPONSEMESSAGES");

const prescriptionSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: [true, `${requiredError} doctor id`],
  },
  medicines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: [true, `${requiredError} medicine id`],
    },
  ],
});

module.exports = mongoose.model(`Prescription`, prescriptionSchema);
