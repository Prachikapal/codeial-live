const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      if (err) {
        console.log("Error in fnding the posts");
        return;
      } else {
        User.find({}, function (err, users) {
          if (err) {
            console.log("Error in finding the user");
            return;
          } else {
            return res.render("home", {
              title: "home",
              posts_list: posts,
              users_list: users,
            });
          }
        });
      }
    });
};
