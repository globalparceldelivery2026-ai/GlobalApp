const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getAllInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiryStats
} = require('../controllers/inquiryController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.post('/', createInquiry);

// Admin routes
router.get('/', protect, admin, getAllInquiries);
router.get('/stats/overview', protect, admin, getInquiryStats);
router.get('/:id', protect, admin, getInquiry);
router.put('/:id', protect, admin, updateInquiry);
router.delete('/:id', protect, admin, deleteInquiry);

module.exports = router;
