const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(err){
            console.log("Error in finding the post");
            return;
        }
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            },function(err,newComment){
                if(err){
                    console.log("Error in creating the comment");
                    return;
                }
                post.comments.push(newComment);
                post.save();
                res.redirect("/");
            });
        }
    })
}