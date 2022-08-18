// importing npm packages
const express = require("express");
const multer = require("multer");
const path = require("path");
const { check } = require("express-validator");

// importing controllers
const {
  register,
  login,
  updatePatient,
  getPatient,
  forgotPassword,
  resetPassword,
} = require("../../controllers/api/patientController");

// import middlewares
const {
  checkDuplicatePatient,
  verifyToken,
  authorizeRole,
} = require("../../middlewares");

// import constants
const {
  passwordRegex,
  cnicRegex,
  stringRegex,
  phoneRegex,
  dateOfBirthRegex,
} = require("../../utils/constants/REGEX");
const ROLES = require("../../utils/constants/ROLES");

// configuring multer
const PATH = path.join(__dirname, "../../../public/images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `avatar-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});

const upload = multer({ storage });

// initializing router
const router = express.Router();

router.post(
  "/register",
  [
    upload.single("avatar"),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a strong password").matches(passwordRegex),
    check("cnic", "Please enter a valid cnic").matches(cnicRegex),
    check("name", "Name should only contain alphabets").matches(stringRegex),
    check("phone", "Please enter a valid phone number").matches(phoneRegex),
    check("dob", "Please enter a valid date of birth").matches(
      dateOfBirthRegex
    ),
    checkDuplicatePatient,
  ],
  register
);

router.post("/login", login);

// routes to reset patient's forgotten password
router.patch(
  "/forgot-password",
  [check("email", "Please enter a valid email").isEmail()],
  forgotPassword
);
router.patch(
  "/reset-password",
  [check("password", "Please enter a strong password").matches(passwordRegex)],
  resetPassword
);

// middlewares to verify users
router.use(verifyToken);
router.use(authorizeRole(ROLES[1]));

// patient routes to get, update users
router.route("/:id").get(getPatient).patch(updatePatient);

module.exports = router;
