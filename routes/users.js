const express = require("express");
const userController = require("../controllers/user_controller");
const passport = require("passport");

const router = express.Router();

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);

router.post("/update/:id", passport.checkAuthentication, userController.update);
router.get("/signup", userController.signup);
router.get("/signin", userController.signin);
router.get("/signout", userController.destroySession);

router.post("/create-user", userController.createUser);

//use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  userController.createSession
);

module.exports = router;
