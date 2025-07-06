const express = require('express');
const router = express.Router();
const { getPosts, createPost, login, createUser, updatePost, deletePost } = require('../controllers/controller');
const authenticate = require('../middleware/auth')

// Public route
router.get('/', getPosts);// Get all posts route

// Authenticated routes
router.post('/', authenticate, createPost);// Create post route
router.post('/login', login);// Login route
router.post('/users', createUser);
router.delete('/:id', authenticate, deletePost);
router.put('/:id', authenticate, updatePost);

module.exports = router;