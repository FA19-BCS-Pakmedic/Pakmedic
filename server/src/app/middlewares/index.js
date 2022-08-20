const middlewares = {};

middlewares.checkDuplicatePatient = require("./checkDuplicatePatient");
middlewares.checkDuplicateDoctor = require("./checkDuplicateDoctor");
middlewares.verifyToken = require("./tokenVerification");
middlewares.authorizeRole = require("./roleAuthorization");
middlewares.patientRegistrationValidator = require("./patientRegisterValidator");
module.exports = middlewares;
