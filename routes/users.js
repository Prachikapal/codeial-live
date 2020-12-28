const express = require("express");
const userController = require("../controllers/user_controller");

const router = express.Router();

router.get("/profile", userController.profile);
router.get("/signup", userController.signup);
router.get("/signin", userController.signin);

module.exports = router;
