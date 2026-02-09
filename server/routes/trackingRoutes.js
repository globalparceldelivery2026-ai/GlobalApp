const express = require('express');
const router = express.Router();
const {
  createTracking,
  getTrackingByNumber,
  getAllTracking,
  updateTracking,
  deleteTracking
} = require('../controllers/trackingController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/:trackingNumber', getTrackingByNumber);

// Admin routes
router.post('/', protect, admin, createTracking);
router.get('/', protect, admin, getAllTracking);
router.put('/:id/update', protect, admin, updateTracking);
router.delete('/:id', protect, admin, deleteTracking);

module.exports = router;
