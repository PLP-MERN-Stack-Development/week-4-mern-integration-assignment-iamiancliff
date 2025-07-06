const express = require('express');
const router = express.Router();
const { getCategories, createCategory } = require('../controllers/controller');
const authenticate = require('../middleware/auth')

// Public route to get all categories
router.get('/', getCategories);

// Authenticated route to create a new category
router.post('/', createCategory, authenticate,);

module.exports = router;