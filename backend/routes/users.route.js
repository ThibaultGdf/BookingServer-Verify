const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

/* GET */
router.get("/", userController.getAll);
router.get("/:id", userController.getOne);

/* PUT */
router.put("/:id", userController.put);

/* PUT */
router.put("/editRole/:id", userController.editRole);

/* DELETE */
router.delete("/:id", userController.destroy);

module.exports = router;
