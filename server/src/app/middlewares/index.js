const middlewares = {};

middlewares.checkDuplicatePatient = require("./checkDuplicatePatient");
middlewares.checkDuplicateDoctor = require("./checkDuplicateDoctor");
middlewares.verifyToken = require("./tokenVerification");
middlewares.authorizeRole = require("./roleAuthorization");

module.exports = middlewares;
