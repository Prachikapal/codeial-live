const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, profile) {
    if (err) {
      console.log("Error in finding the Profile");
      return;
    } else {
      return res.render("user_profile", {
        title: "Profile",
        profile_user: profile,
      });
    }
  });
};

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      if (err) {
        console.log("Error in updating the Profile");
        return;
      } else {
        return res.redirect("back");
      }
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signup", {
    title: "sign up",
  });
};

module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signin", {
    title: "sign in",
  });
};

//signup
module.exports.createUser = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the account");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, newUser) {
        if (err) {
          console.log("Error in creating User");
          return;
        }
        return res.redirect("/users/signin");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//sign in create a session
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};
