const express = require('express');
const router = express.Router();
const multer = require('multer');
const { UserController, PostController, CommentsController, LikeController } = require('../controllers');
const authToken = require('../middleware/auth');
const uploadDestination = 'uploads';

const storage = multer.diskStorage({
    destination: uploadDestination,
    filename: function(req, file, next)  {
        next(null, file.originalname);
    }
});

const uploads = multer({storage: storage});

//Routes for User
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/current', authToken, UserController.current);
router.get('/users/:id', authToken, UserController.getUserById);
router.put('/users/:id', authToken, UserController.updateUser);

//Routes for posts
router.post('/posts', authToken, PostController.createPost);
router.get('/posts', authToken, PostController.getAllPosts);
router.get('/posts/:id', authToken, PostController.getPostById);
router.delete('/posts/:id', authToken, PostController.deletePost);

//Comments routes
router.post("/comments", authToken, CommentsController.createComment);
router.delete("/comments/:id", authToken, CommentsController.deleteComment);

//Like routes
router.post("/likes", authToken, LikeController.likePost);
router.delete("/likes/:id", authToken, LikeController.unlikePost);

module.exports = router;