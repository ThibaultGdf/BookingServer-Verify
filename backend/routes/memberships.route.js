const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membership.controller.js");

/* GET */
router.get("/", membershipController.getAll);
router.get("/:id", membershipController.getOne);

/* POST */
router.post("/", membershipController.post);

/* PUT */
router.put("/:id", membershipController.put);

/* DELETE */
router.delete("/:id", membershipController.destroy);

module.exports = router;
