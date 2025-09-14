const express = require('express');
const router = express.Router();
const { authenticate, optionalAuth } = require('../middleware/auth');
const {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  addProductReview,
  getCategories
} = require('../controllers/productController');

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', optionalAuth, getProductById);

// Protected routes
router.post('/:id/reviews', authenticate, addProductReview);

module.exports = router;
