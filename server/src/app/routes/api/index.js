const routers = {};

routers.patient = require("./patientRoutes");
routers.doctor = require("./doctorRoutes");
// routers.auth = require()

module.exports = routers;
