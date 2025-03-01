const express = require('express');
const { tokenValidation } = require('../Middleware/UserValidation');
const { searchCategories } = require('../Controllers/SearchController');

const router = express.Router();

router.get('/:category',tokenValidation,searchCategories);

module.exports = router;