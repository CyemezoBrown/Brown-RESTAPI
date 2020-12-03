// import { Router } from 'express';
// import PostController from '../controllers/post.controller';

const  { Router } = require("express")
const PostController = require("../controllers/post.controller")

//let authenticateJWT;
const router = new Router();
const authenticateJWT = require('../controllers/middleware')
// Get all Posts
router.get('/',(req, res) =>{
 PostController.getAll(req,res);
}),
router.get('/', authenticateJWT, (req, res) => {
    res.json(post);
});
// Get one post by cuid
router.get('/:cuid', (req, res) =>{
    PostController.getPost(req,res);
});
// Add a new Post
router.post('/add', (req, res) => {
    PostController.addPost(req, res);
});

router.put('/:cuid', (req, res) => {
    PostController.updatePost(req, res);
});

module.exports = router;
// // Delete a post by cuid
// router.delete('/:cuid', (req, res) => {
//     PostController.deletePost(req, res);
// });
// //export default router;

// module.exports = router;