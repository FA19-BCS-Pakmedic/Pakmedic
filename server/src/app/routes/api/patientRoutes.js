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
  resetForgottenPassword,
  resetPassword,
} = require("../../controllers/api/patientController");

// import middlewares
const {
  checkDuplicatePatient,
  verifyToken,
  authorizeRole,
} = require("../../middlewares");

// import utils
const {
  passwordRegex,
  cnicRegex,
  stringRegex,
  phoneRegex,
  dateOfBirthRegex,
} = require("../../utils/constants/REGEX");
const ROLES = require("../../utils/constants/ROLES");
const {
  invalidEmail,
  invalidPassword,
  invalidCnic,
  invalidStringRegex,
  invalidPhoneNo,
  invalidDOB,
} = require("../../utils/constants/ERRORMESSAGES");

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
    check("email", invalidEmail).isEmail(),
    check("password", invalidPassword).matches(passwordRegex),
    check("cnic", invalidCnic).matches(cnicRegex),
    check("name", invalidStringRegex).matches(stringRegex),
    check("phone", invalidPhoneNo).matches(phoneRegex),
    check("dob", invalidDOB).matches(dateOfBirthRegex),
    checkDuplicatePatient,
  ],
  register
);

router.post("/login", login);

// routes to reset patient's forgotten password
router.patch(
  "/forgot-password",
  [check("email", invalidEmail).isEmail()],
  forgotPassword
);
router.patch(
  "/reset-forgotten-password",
  [check("password", invalidPassword).matches(passwordRegex)],
  resetForgottenPassword
);

// middlewares to verify users
router.use(verifyToken);

//route to reset patient's password if the patient is logged in
router.patch("/reset-password", [
  check("email", invalidEmail).isEmail(),
  check("password", invalidPassword).matches(passwordRegex),
  resetPassword,
]);

router.use(authorizeRole(ROLES[1]));

// patient routes to get, update users
router.route("/:id").get(getPatient).patch(updatePatient);

module.exports = router;
