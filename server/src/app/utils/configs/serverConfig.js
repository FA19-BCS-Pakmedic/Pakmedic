// const dotenv = require("dotenv");

//setting the path to the env file
// dotenv.config({ path: "../../../../env/config.env" });

// getting the server port to run on from env file

// console.log(process.env.PORT);

module.exports = {
  PORT: process.env.PORT || 8080,
};
