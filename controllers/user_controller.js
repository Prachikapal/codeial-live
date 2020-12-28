module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile",
  });
};

module.exports.signup = function (req, res) {
  return res.render("signup", {
    title: "sign up",
  });
};

module.exports.signin = function (req, res) {
  return res.render("signin", {
    title: "sign in",
  });
};
