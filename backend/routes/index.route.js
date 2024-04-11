const express = require("express");
const router = express.Router();

/* GET home page. */
const reservationRouter = require("./reservations.route.js");
const roomRouter = require("./rooms.route.js");
const spotRouter = require("./spots.route.js");
const userRouter = require("./users.route.js");
const membershipRouter = require("./memberships.route.js");

router.use("/reservations", reservationRouter);
router.use("/rooms", roomRouter);
router.use("/spots", spotRouter);
router.use("/users", userRouter);
router.use("/memberships", membershipRouter);

module.exports = router;
