const express = require('express');
const {loginValidation,signUpValidation} = require('../Middleware/UserValidation');
const { signUp, login } = require('../Controllers/UserController');
const router = express.Router();

router.post('/signup',signUpValidation,signUp);

router.post('/login',loginValidation,login);

module.exports = router;