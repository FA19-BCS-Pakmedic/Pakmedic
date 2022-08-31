const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.user = require("./User");

db.patient = require("./Patient");
db.doctor = require("./Doctor");
db.address = require("./Address");
db.hospital = require("./Hospital");
db.experience = require("./Experience");
module.exports = db;
