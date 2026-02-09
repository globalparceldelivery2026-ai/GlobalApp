const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getPayment
} = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);

// Admin routes
router.get('/:paymentId', protect, admin, getPayment);

module.exports = router;
