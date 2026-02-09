const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingStats
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.post('/', createBooking);
router.get('/:id', getBooking);

// Admin routes
router.get('/', protect, admin, getAllBookings);
router.put('/:id', protect, admin, updateBooking);
router.delete('/:id', protect, admin, deleteBooking);
router.get('/stats/overview', protect, admin, getBookingStats);

module.exports = router;
