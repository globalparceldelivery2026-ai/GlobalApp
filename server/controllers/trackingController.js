const Tracking = require('../models/Tracking');
const Booking = require('../models/Booking');

// @desc    Create new tracking entry
// @route   POST /api/tracking
// @access  Private/Admin
const createTracking = async (req, res) => {
  try {
    const data = { ...req.body };
    // Remove empty strings for optional fields to avoid MongoDB type validation errors
    if (!data.bookingRef) delete data.bookingRef;
    if (!data.estimatedDelivery) delete data.estimatedDelivery;

    const tracking = await Tracking.create(data);

    // If bookingRef is provided, update the booking with tracking reference
    if (req.body.bookingRef) {
      await Booking.findByIdAndUpdate(req.body.bookingRef, {
        trackingRef: tracking._id,
        status: 'confirmed'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Tracking created successfully',
      data: tracking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get tracking by tracking number
// @route   GET /api/tracking/:trackingNumber
// @access  Public
const getTrackingByNumber = async (req, res) => {
  try {
    const tracking = await Tracking.findOne({
      trackingNumber: req.params.trackingNumber.toUpperCase()
    }).populate('bookingRef');

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: 'Tracking information not found. Please check your tracking number.'
      });
    }

    res.json({
      success: true,
      data: tracking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all tracking entries
// @route   GET /api/tracking
// @access  Private/Admin
const getAllTracking = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;

    // Pagination
    const skip = (page - 1) * limit;

    const trackings = await Tracking.find(filter)
      .populate('bookingRef')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Tracking.countDocuments(filter);

    res.json({
      success: true,
      data: trackings,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update tracking status and add update
// @route   PUT /api/tracking/:id/update
// @access  Private/Admin
const updateTracking = async (req, res) => {
  try {
    const { status, location, description, currentLocation } = req.body;

    const tracking = await Tracking.findById(req.params.id);

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: 'Tracking not found'
      });
    }

    // Add new update to the updates array
    if (status && location && description) {
      tracking.updates.push({
        status,
        location,
        description,
        timestamp: new Date()
      });
    }

    // Update current status and location
    if (status) tracking.status = status;
    if (currentLocation) tracking.currentLocation = currentLocation;

    // If delivered, set actual delivery date
    if (status === 'delivered' && !tracking.actualDelivery) {
      tracking.actualDelivery = new Date();
    }

    await tracking.save();

    res.json({
      success: true,
      message: 'Tracking updated successfully',
      data: tracking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete tracking
// @route   DELETE /api/tracking/:id
// @access  Private/Admin
const deleteTracking = async (req, res) => {
  try {
    const tracking = await Tracking.findById(req.params.id);

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: 'Tracking not found'
      });
    }

    await tracking.deleteOne();

    res.json({
      success: true,
      message: 'Tracking deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createTracking,
  getTrackingByNumber,
  getAllTracking,
  updateTracking,
  deleteTracking
};
