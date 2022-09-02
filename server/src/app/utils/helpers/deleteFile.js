const fs = require("fs");
const path = require("path");
const { fileDeleteSuccess } = require("../constants/RESPONSEMESSAGES");

// configuring multer

module.exports = (filename, folderName) => {
  const PATH = path.join(__dirname, "../../../public", folderName);
  fs.unlink(`${PATH}/${filename}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(fileDeleteSuccess);
    }
  });
};
