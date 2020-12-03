// import { Router } from 'express';
// import PostController from '../controllers/post.controller';

const  { Router } = require("express")
const PostController = require("../controllers/post.controller")
const post = require('../controllers/middleware')
const router = new Router();

// Get all Posts

router.get('/',(req, res) =>{PostController.getAll(req,res);}),
router.get('/', authenticateJWT, (req, res) => {post.getAll(req, res);});

//Get one post by cuid
router.get('/:cuid', (req, res) =>{PostController.getPost(req,res)});
router.get('/:cuid', authenticateJWT, (req, res) => {post.getPost(req, res)});
// Add a new Post
router.post('/add', (req, res) => {PostController.addPost(req, res)});
router.post('/add', authenticateJWT, (req, res) => {post.addPost(req, res)});

 //Update a post
router.put('/:cuid', (req, res) => {PostController.updatePost(req, res)});

// Delete a post by cuid
router.delete('/:cuid', (req, res) => {
    PostController.deletePost(req, res);
});

//export default router;
module.exports = router;