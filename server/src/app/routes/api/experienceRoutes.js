// importing npm packages
const express = require("express");
const multer = require("multer");
const path = require("path");

// initializing router
const router = express.Router();

// importing controller
const {
  addExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} = require("../../controllers/api/experienceController");

// importing middlewares
const { fetchHospital, fetchAddress } = require("../../middlewares");

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

/****************************** routes **********************/

router
  .route("/")
  .post([upload.single("image"), fetchAddress, fetchHospital], addExperience)
  .get(getAllExperiences);

router
  .route("/:id")
  .get(getExperienceById)
  .patch(
    [upload.single("image"), fetchAddress, fetchHospital],
    updateExperience
  )
  .delete(deleteExperience);

module.exports = router;
