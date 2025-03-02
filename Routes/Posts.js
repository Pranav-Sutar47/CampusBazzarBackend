const express = require('express');
const { tokenValidation } = require('../Middleware/UserValidation');
const { upload } = require('../config/multer');
const { addPostValidation } = require('../Middleware/PostValidation');
const { addPost, getPost, deletePost, addLike, getUserPost } = require('../Controllers/PostController');
const { getUser } = require('../Controllers/UserController');

const router = express.Router();

router.post('/add',tokenValidation,upload.array('images',5),addPostValidation,addPost);

router.get('/get',getPost);

router.get('/user',tokenValidation,getUserPost);

router.delete('/delete/:id',tokenValidation,deletePost);

router.get('/like/:id',tokenValidation,addLike);

module.exports = router;