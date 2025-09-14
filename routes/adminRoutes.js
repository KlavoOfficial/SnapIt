const express = require('express');
const router = express.Router();
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');
const {
  getDashboardStats,
  getUsers,
  toggleUserStatus,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  getAdminOrders,
  updateOrderStatus,
  getAdminFeedback,
  respondToFeedback
} = require('../controllers/adminController');

// All admin routes require authentication and admin role
//router.use(authenticate);
//router.use(requireAdmin);

// Dashboard
router.get('/dashboard', getDashboardStats);

// User management
router.get('/users', getUsers);
router.put('/users/:id/toggle-status', toggleUserStatus);

// Product management
router.get('/products', getAdminProducts);
router.post('/products', validateProduct, createProduct);
router.put('/products/:id', validateProduct, updateProduct);
router.delete('/products/:id', deleteProduct);

// Order management
router.get('/orders', getAdminOrders);
router.put('/orders/:id/status', updateOrderStatus);

// Feedback management
router.get('/feedback', getAdminFeedback);
router.post('/feedback/:id/respond', respondToFeedback);

module.exports = router;
