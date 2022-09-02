// importing npm packages
const express = require("express");
const multer = require("multer");
const path = require("path");

// impporting utils
const roles = require("../../utils/constants/ROLES");

// initializing router
const router = express.Router();

// importing controller
const {
  addExperience,
  getAllExperiences,
  getExperienceById,
  getSpecificDoctorExperiences,
  updateExperience,
  deleteExperience,
} = require("../../controllers/api/experienceController");

// importing middlewares
const {
  fetchHospital,
  fetchAddress,
  authorizeRole,
  verifyToken,
} = require("../../middlewares");

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

/*************** Authorization middle wares *******************************/

router.use(verifyToken);
// router.use(authorizeRole(roles[0], roles[1]));

/****************************** routes **********************/
router.post(
  "/",
  [
    authorizeRole(roles[1]),
    upload.single("image"),
    fetchAddress,
    fetchHospital,
  ],
  addExperience
); //this route is only accessible to doctors
// .get(getAllExperiences);

router.get("/", [authorizeRole(roles[2])], getAllExperiences); //this route is only accessible to admin

router
  .route("/:id")
  .get(getExperienceById)
  .patch([fetchAddress, fetchHospital], updateExperience)
  .delete(deleteExperience); //these routes is accessible to all type of users

router.route("/doctors/:id").get(getSpecificDoctorExperiences); //this routes is accessible to all type of users
module.exports = router;
