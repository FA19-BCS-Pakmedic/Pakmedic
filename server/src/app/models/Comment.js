const mongoose = require("mongoose");

const { requiredError } = require("../utils/constants/RESPONSEMESSAGES");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, `${requiredError} content`],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor" || "Patient",
    required: [true, `${requiredError} author`],
  },
  date_posted: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model(`Comment`, commentSchema);
