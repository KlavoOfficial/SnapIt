const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  processPayment
} = require('../controllers/orderController');

// All order routes require authentication
router.use(authenticate);

router.post('/', validateOrder, createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);
router.post('/payment', processPayment);

module.exports = router;
