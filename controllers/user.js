const User = require("../models/user");

// Sign up new user

module.exports.signUpForm = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.signUpNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const regUser = await User.register(newUser, password);

    req.login(regUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", `Hey ${username} Welcome to Wanderlust!`);
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Login user

module.exports.loginForm = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Logout User

module.exports.logOutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};
