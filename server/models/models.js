const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true,
    minlength: [3, 'Category name must be at least 3 characters'],
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    trim: true,
    minlength: [10, 'Content must be at least 10 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'At least one category is required']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// Update `updatedAt` before saving a post
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'] // Adjust as needed
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Category = mongoose.model('Category', categorySchema);
const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Category, Post, User };