const express = require('express');
const { tokenValidation } = require('../Middleware/UserValidation');
const { searchCategories, searchCollege } = require('../Controllers/SearchController');

const router = express.Router();

router.get('/cat/:category',searchCategories);

router.get('/college',searchCollege);

module.exports = router;