configs = {};

configs.corsConf = require("./corsConfig");
configs.jwtConf = require("./jwtConfig");
configs.dbConf = require("./dbConfig");
configs.serverConf = require("./serverConfig");
configs.pmcConf = require("./pmcConfig");

module.exports = configs;
