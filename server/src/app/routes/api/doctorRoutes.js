// npm packages import
const express = require("express");

// controller functions import
const { verifyDoctor } = require("../../controllers/api/doctorController");

// middleware imports
const {} = require("../../middlewares");


// initializing router
const router = express.Router();


/*****************************ROUTES********************************/

// verify doctor pmc id
router.post("/pmc/verify", verifyDoctor);



module.exports = router;