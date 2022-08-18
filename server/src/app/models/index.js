const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.user = require("./User");
db.patient = require("./Patient");
db.doctor = require("./Doctor");

module.exports = db;
