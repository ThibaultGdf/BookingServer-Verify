const express = require("express");
const router = express.Router();
const spotController = require("../controllers/spot.controller.js");

/* GET */
router.get("/", spotController.getAll);
router.get("/:id", spotController.getOne);

/* POST */
router.post("/", spotController.post);

/* PUT */
router.put("/:id", spotController.put);

/* DELETE */
router.delete("/:id", spotController.destroy);

module.exports = router;
