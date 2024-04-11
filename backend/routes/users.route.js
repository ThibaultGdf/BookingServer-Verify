const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const authenticateMiddleware = require("../middlewares/authenticate.middleware.js");

/* GET */
router.get("/", authenticateMiddleware.isAdmin, userController.getAll);
router.get("/:id", userController.getOne);

/* PUT */
router.put("/:id", userController.put);

/* PUT */
router.put(
    "/editRole/:id",
    authenticateMiddleware.isAdmin,
    userController.editRole,
);

/* DELETE */
router.delete("/:id", userController.destroy);

module.exports = router;
