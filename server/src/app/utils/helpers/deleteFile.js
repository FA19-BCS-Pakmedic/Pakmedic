const fs = require("fs");

const { fileDeleteSuccess } = require("../constants/RESPONSEMESSAGES");

module.exports = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(fileDeleteSuccess);
    }
  });
};
