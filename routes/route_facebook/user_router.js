const express = require("express");
const router = express.Router();

const userController = require("../../controllers/users_controller");

router.post("/login/", userController.login);
router.post("/register/", userController.register);
router.get("/get", userController.show);
router.delete("/delete/:id", userController.delete);

module.exports = router;
