const multer = require("multer");
const path = require("path");

// configuring multer
const PATH = path.join(__dirname, "../../../public/images");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, PATH);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// // const upload = multer({ storage });

// module.exports = storage;
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, PATH);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `avatar-${Date.now()}.${file.mimetype.split("/")[1]}`);
//   },
// });

module.exports = storage;
