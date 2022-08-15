//importing modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// exiting the program in case of non operational error
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

//setting the path to the env file
dotenv.config({ path: "../env/config.env" });

// importing local files
const app = require("./app");
const db_config = require("./app/utils/configs/dbConfig");
const server_config = require("./app/utils/configs/serverConfig");

// setting database and connecting to it
const connectionString = `mongodb://${db_config.HOST}:${db_config.PORT}/${db_config.DB}`;
const DB = mongoose.connect(connectionString);
console.log("database is connected");

// setting the server to run on a port
const server = app.listen(server_config.PORT, () => {
  console.log(`Server is running on port ${server_config.PORT}`);
});

// handling non operational error and shutting server down
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
