const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room.controller.js");

/* GET */
router.get("/", roomController.getAll);
router.get("/:id", roomController.getOne);

/* POST */
router.post("/", roomController.post);

/* PUT */
router.put("/:id", roomController.put);

/* DELETE */
router.delete("/:id", roomController.destroy);

module.exports = router;
