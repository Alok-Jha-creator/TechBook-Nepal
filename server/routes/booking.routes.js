const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')
const {
  createBooking,
  getMyBookings,
  getTechnicianBookings,
  updateBookingStatus,
} = require('../controllers/booking.controller')

// Customer routes
router.post('/', authMiddleware, roleMiddleware('customer'), createBooking)
router.get('/my', authMiddleware, roleMiddleware('customer'), getMyBookings)

// Technician routes
router.get('/technician', authMiddleware, roleMiddleware('technician'), getTechnicianBookings)
router.patch('/:id/status', authMiddleware, roleMiddleware('technician'), updateBookingStatus)

module.exports = router