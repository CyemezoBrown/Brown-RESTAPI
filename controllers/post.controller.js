const Post  = require("../models/post.model")
const cuid = require("cuid")
const slug = require("limax")
const sanitizeHtml = require("sanitize-html");
const { all } = require("../server");

// Get all post
  const getAll = async (_req, res) => {
            await Post.find().sort('-dateAdded').exec((err, posts) => {
                if (err || !posts) {
                    res.status(500).send(err);
                }else{
                res.json({ posts });
                }
            });
    };
// Get post by ID and returns it
    const getPost = async (req, res) => {
            Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
                if (err || !post) {
                    res.status(500).send(err);
                }else{
                res.json({ post });
                }
            });
    }
//add post to database
    const addPost = async (req, res) => {
            try {
                if (!req.body.post.title || !req.body.post.content) {
                    res.status(403).send({
                        message: "cannot post with empty field"
                    });
                }        
                const newPost = new Post(req.body.post);
        
                // Sanitize inputs
                newPost.title = sanitizeHtml(newPost.title);
                newPost.content = sanitizeHtml(newPost.content);
        
                newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
                newPost.cuid = cuid();
        
                newPost.save((err, saved) => {
                  return res.status(200).json({ post: saved });
                });
            }
            catch (err) {
                res.status(500).json({err});
            }
        }
// updating post by cuid
const updatePost = async (req, res) => {
    try {
        if (!req.body.post.title || !req.body.post.content) {
            res.status(403).end();
        }
        Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
            // Handle database errors
            if (err) {
                res.status(500).send(err);
            } else {
                post.title = req.body.post.title || post.title;
                post.content = req.body.post.content || post.content;
                // Save 
                post.save((err, saved) => {
                    res.json({ post: saved });
                });
            }
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
}
// delete post by cuid
const deletePost = async (req, res) =>{
    Post.remove({cuid:req.params.cuid }, function (err, result) {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send({
            message: "Post have been deleted"
        });
    });
}
module.exports = {
    getAll,
    getPost,
    addPost,
    updatePost,
    deletePost       
}