const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.controller.js");

/* GET */
router.get("/", reservationController.getAll);
router.get("/:id", reservationController.getOne);

/* POST */
router.post("/", reservationController.post);

/* PUT */
router.put("/:id", reservationController.put);

/* DELETE */
router.delete("/:id", reservationController.destroy);

module.exports = router;
