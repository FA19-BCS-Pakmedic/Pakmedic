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
  googleLogin,
  facebookLogin,
} = require("../../controllers/api/patientController");

// import middlewares
const {
  checkDuplicatePatient,
  verifyToken,
  authorizeRole,
  patientRegistrationValidator,
} = require("../../middlewares");

// import utils
const {
  passwordRegex,
  // cnicRegex,
  // stringRegex,
  // phoneRegex,
  // dateOfBirthRegex,
} = require("../../utils/constants/REGEX");
const ROLES = require("../../utils/constants/ROLES");
const {
  invalidEmail,
  invalidPassword,
  // invalidCnic,
  // invalidStringRegex,
  // invalidPhoneNo,
  // invalidDOB,
} = require("../../utils/constants/RESPONSEMESSAGES");

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


/*****************************ROUTES********************************/

// register a patient
router.post(
  "/register",
  [
    upload.single("avatar"),
    patientRegistrationValidator,
    checkDuplicatePatient,
  ],
  register
);

router.post("/login", login);

// third party login routes
router.post("/login/facebook", facebookLogin);
router.post("/login/google", googleLogin);

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

router.use(authorizeRole(ROLES[0]));

// patient routes to get, update users
router.route("/:id").get(getPatient).patch(updatePatient);

module.exports = router;
