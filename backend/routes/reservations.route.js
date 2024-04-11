const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.controller.js");
const authenticateMiddleware = require("../middlewares/authenticate.middleware.js");

/* GET */
router.get("/", authenticateMiddleware.isAdmin, reservationController.getAll);
router.get("/:id", reservationController.getOne);

/* POST */
router.post("/", reservationController.post);

/* PUT */
router.put("/:id", reservationController.put);

/* DELETE */
router.delete(
    "/:id",
    authenticateMiddleware.isAdmin,
    reservationController.destroy,
);

module.exports = router;
