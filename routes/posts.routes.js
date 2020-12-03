
const  { Router } = require("express")
const {getAll,getPost,addPost,updatePost,deletePost} = require("../controllers/post.controller")
const {authenticateJWT} = require('../controllers/middleware');
const router = new Router();

// CRUD 

router.get('/', getAll);
router.get('/:cuid', getPost);
router.post('/add', authenticateJWT);
router.post('/add', addPost);
router.put('/:cuid', updatePost);
router.delete('/:cuid', deletePost);

module.exports = router;