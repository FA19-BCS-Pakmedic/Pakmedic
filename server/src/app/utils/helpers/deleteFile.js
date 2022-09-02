const fs = require("fs");
const path = require("path");
const { fileDeleteSuccess } = require("../constants/RESPONSEMESSAGES");

// configuring multer
const PATH = path.join(__dirname, "../../../public/images");

module.exports = (filename) => {
  fs.unlink(`${PATH}/${filename}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(fileDeleteSuccess);
    }
  });
};
