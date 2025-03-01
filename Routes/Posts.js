const express = require('express');
const { tokenValidation } = require('../Middleware/UserValidation');
const { upload } = require('../config/multer');
const { addPostValidation } = require('../Middleware/PostValidation');
const { addPost, getPost } = require('../Controllers/PostController');

const router = express.Router();

router.post('/add',tokenValidation,upload.array('images',5),addPostValidation,addPost);

router.get('/get',tokenValidation,getPost);

module.exports = router;