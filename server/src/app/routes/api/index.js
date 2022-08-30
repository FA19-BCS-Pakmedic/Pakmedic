const routers = {};

routers.patient = require("./patientRoutes");
routers.doctor = require("./doctorRoutes");
routers.chatbot = require("./chatbotRoutes");
// routers.auth = require()
routers.hospital = require('./hospitalRoutes')

module.exports = routers;
