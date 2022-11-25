const mongoose = require("mongoose");

const { requiredError } = require("../utils/constants/RESPONSEMESSAGES");

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `${requiredError} name`],
  },
  tags: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
  },
  members: {
    type: Number,
    default: 0,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = mongoose.model(`Community`, communitySchema);
