const routers = {};

routers.patient = require("./patientRoutes");
routers.doctor = require("./doctorRoutes");
routers.chatbot = require("./chatbotRoutes");
// routers.auth = require()
routers.hospital = require("./hospitalRoutes");
routers.experience = require("./experienceRoutes");
routers.service = require("./serviceRoutes");
routers.family = require("./familyRoutes");
routers.scan = require("./scanRoutes");
module.exports = routers;
