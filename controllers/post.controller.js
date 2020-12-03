// import Post from '../models/post';
// import cuid from 'cuid';
// import slug from 'limax';
// import sanitizeHtml from 'sanitize-html';

const Post  = require("../models/post.model")
const cuid = require("cuid")
const slug = require("limax")
const sanitizeHtml = require("sanitize-html")



 // Get all post
  const getAll = async (_req, res) => {
        try {
            await Post.find().sort('-dateAdded').exec((err, posts) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({ posts });
            });
        }
        catch(err) {
            res.send(err);
        }
    };

    // Get post by ID and returns it
    const getPost = async (req, res) => {
        try{
            Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({ post });
            });
        }
        catch(err){
    
        }
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
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.json({ post: saved });
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).send(err);
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
                console.log('Post about to be saved');
                // Save 
                post.save((err, saved) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.json({ post: saved });
                });
            }
        });
    }
    catch (err) {
        console.log(err);
       // res.status(500).send(err);
    }
}

// delete post by cuid
const deletePost = async (req, res) => {
    try {
        Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
            if (err) {
                res.status(500).send(err);
            }

            post.remove({cuid:req.params.cuid }, function (_err, _result) {
                    res.status(200).end();
                });
        });
    }
    catch (err) {
        console.log(err);
       // res.status(500).send(err);
    }
}

//export default PostController;

module.exports = {
    getAll,
    getPost,
    addPost,
    updatePost,
    deletePost       
}