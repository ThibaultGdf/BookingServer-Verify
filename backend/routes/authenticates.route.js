const express = require("express");
const router = express.Router();
const authenticateController = require("../controllers/authenticate.controller.js");

/* POST */
router.post("/signup", authenticateController.signUp);

router.post("/signin", authenticateController.signIn);

module.exports = router;
