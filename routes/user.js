const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/user");

// Compact Route "/signup"

router
  .route("/signup")
  .get(userController.signUpForm)
  .post(wrapAsync(userController.signUpNewUser));

// Compact Route "/login"

router
  .route("/login")
  .get(userController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginUser
  );

// logout User

router.get("/logout", userController.logOutUser);

module.exports = router;
