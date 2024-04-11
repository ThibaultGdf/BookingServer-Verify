const express = require("express");
const router = express.Router();
const spotController = require("../controllers/spot.controller.js");
const authenticateMiddleware = require("../middlewares/authenticate.middleware.js");

/* GET */
router.get("/", spotController.getAll);
router.get("/:id", spotController.getOne);

/* POST */
router.post("/", authenticateMiddleware.isAdmin, spotController.post);

/* PUT */
router.put("/:id", authenticateMiddleware.isAdmin, spotController.put);

/* DELETE */
router.delete("/:id", authenticateMiddleware.isAdmin, spotController.destroy);

module.exports = router;
