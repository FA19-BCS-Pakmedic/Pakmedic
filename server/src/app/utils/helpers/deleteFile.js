const fs = require("fs");

module.exports = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted the file.");
    }
  });
};
