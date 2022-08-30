const middlewares = {};

middlewares.checkDuplicatePatient = require("./checkDuplicatePatient");
middlewares.checkDuplicateDoctor = require("./checkDuplicateDoctor");
middlewares.checkDuplicatePmc = require("./checkDuplicatePmc");
middlewares.checkDuplicateEmail = require("./checkDuplicateEmail");
middlewares.checkDuplicateCnic = require("./checkDuplicateCnic");
middlewares.verifyToken = require("./tokenVerification");
middlewares.authorizeRole = require("./roleAuthorization");
middlewares.patientRegistrationValidator = require("./patientRegisterValidator");
middlewares.doctorRegistrationValidator = require("./doctorRegisterValidator");
middlewares.fetchAddress = require("./fetchAddress");
module.exports = middlewares;
