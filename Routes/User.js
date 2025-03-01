const express = require('express');
const {loginValidation,signUpValidation, tokenValidation} = require('../Middleware/UserValidation');
const { signUp, login, uploadProfileImage, getUser } = require('../Controllers/UserController');
const { upload } = require('../config/cloudinaryConfig');
const router = express.Router();

router.post('/signup',signUpValidation,signUp);

router.post('/login',loginValidation,login);

router.post('/profileImage',tokenValidation,upload.single('image'), uploadProfileImage);

router.get('/',tokenValidation,getUser);

module.exports = router;