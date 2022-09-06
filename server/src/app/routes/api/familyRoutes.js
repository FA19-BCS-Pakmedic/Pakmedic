// import npm packages
const express = require("express");

// import controller
const {
  addFamilyMember,
  getFamilyMemberById,
  updateFamilyMember,
} = require("../../controllers/api/familyController");

// import middlewares
const { authorizeRole, verifyToken } = require("../../middlewares");

// import utils
const ROLES = require("../../utils/constants/ROLES");

// configure router
const router = express.Router();

/*******************ROUTES***************************/

// authorization middlewares
router.use(verifyToken);

router
  .route("/:id")
  .get(getFamilyMemberById)
  .patch([authorizeRole(ROLES[0])], updateFamilyMember);

router.use(authorizeRole(ROLES[0]));

// basic crud operations
router.route("/").get().post(addFamilyMember).patch().delete();

// export router
module.exports = router;
