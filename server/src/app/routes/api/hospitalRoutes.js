// import express
const express = require("express");
const multer = require("multer");
const path = require("path");

// importing controller
const {
  getAllHospitals,
  createHospital,
  getHospitalById,
  updateHospital,
  deleteHospital,
} = require("../../controllers/api/hospitalController");

// importing middlewares
const { fetchAddress } = require("../../middlewares");

// initializing router
const router = express.Router();

// configuring multer
const PATH = path.join(__dirname, "../../../public/images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `hospital-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});

const upload = multer({ storage });

/**************************ROUTES***************************/

router
  .route("/")
  .get(getAllHospitals)
  .post([upload.single("image"), fetchAddress], createHospital);

router
  .route("/:id")
  .get(getHospitalById)
  .patch(updateHospital)
  .delete(deleteHospital);

module.exports = router;
