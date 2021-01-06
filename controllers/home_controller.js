const Post = require("../models/post");

module.exports.home = function (req, res) {
  Post.find({})
  .populate("user")
  .populate({
    path:"comments",
    populate:{
      path:"user"
    }
  })
  .exec(function(err,posts){
    if(err)
    {
      console.log("Error in fnding the posts");
      return;
    }
    else
    {
      return res.render("home", {
      title: "home",
      posts_list : posts
      });
    }
  });
};
