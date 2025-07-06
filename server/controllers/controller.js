const { Post, Category, User } = require('../models/models');
const { body, validationResult } = require('express-validator');
const { generateToken } = require('../utils/auth'); 
const bcrypt = require('bcryptjs');

// Get Posts
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('categories');
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// Create Post
exports.createPost = [
  body('title').trim().isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),
  body('content').trim().isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('author').trim().notEmpty().withMessage('Author is required'),
  body('categories').isArray({ min: 1 }).withMessage('At least one category is required'),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, content, author, categories } = req.body;
      const validCategories = await Category.find({ _id: { $in: categories } });
      if (validCategories.length !== categories.length) {
        return res.status(400).json({ message: ' Invalid category IDs' });
      }
      const post = new Post({ title, content, author, categories });
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
];

// Get categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// Create Category
exports.createCategory = [
  body('name').trim().isLength({ min: 3, max: 50 }).withMessage('Category name must be 3-50 characters'),
  body('description').optional().trim().isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters'),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, description } = req.body;
      const category = new Category({ name, description });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
];

// Login 
exports.login = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const token = generateToken(user._id);
      res.json({ token });
    } catch (error) {
      next(error);
    }   
  }
];  

// Create User
exports.createUser = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { username, password } = req.body;
      const user = new User({ username, password });
      await user.save();
      res.status(201).json({ message: 'User created', user: { username } });
    } catch (error) {
      next(error);
    }
  }
];

exports.updatePost = [
  body('title').optional().trim().isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),
  body('content').optional().trim().isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('author').optional().trim().notEmpty().withMessage('Author is required'),
  body('categories').optional().isArray({ min: 1 }).withMessage('At least one category is required'),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { id } = req.params;
      const { title, content, author, categories } = req.body;
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      console.log('Post author:', post.author, 'Req user id:', req.user.id);
      // Fetch user to get username
      const user = await User.findById(req.user.id);
      if (!user || post.author !== user.username && req.user.id !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      if (categories) {
        const validCategories = await Category.find({ _id: { $in: categories } });
        if (validCategories.length !== categories.length) return res.status(400).json({ message: 'Invalid category IDs' });
      }
      post.title = title || post.title;
      post.content = content || post.content;
      post.author = author || post.author;
      post.categories = categories || post.categories;
      post.updatedAt = Date.now();
      await post.save();
      res.json(post);
    } catch (error) {
      next(error);
    }
  }
];

// Delete Post
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    console.log('Post author:', post.author, 'Req user id:', req.user.id); // Debug
    // Fetch user to get username
    const user = await User.findById(req.user.id);
    if (!user || post.author !== user.username && req.user.id !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};