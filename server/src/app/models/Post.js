const mongoose = require("mongoose");

const { requiredError } = require("../utils/constants/RESPONSEMESSAGES");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `${requiredError} title`],
  },
  content: {
    type: String,
    required: [true, `${requiredError} content`],
  },
  date_posted: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor" || "Patient",
    required: [true, `${requiredError} author`],
  },
  image: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model(`Post`, postSchema);
