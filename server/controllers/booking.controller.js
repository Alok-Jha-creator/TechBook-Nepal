const Booking = require('../models/Booking')
const Technician = require('../models/Technician')

// Create booking
const createBooking = async (req, res) => {
  try {
    const { technicianId, scheduledAt, address, problem } = req.body

    const technician = await Technician.findById(technicianId)
    if (!technician || !technician.isVisible) {
      return res.status(404).json({ message: 'Technician फेला परेन!' })
    }

    const booking = await Booking.create({
      customerId: req.user.id,
      technicianId,
      scheduledAt,
      address,
      problem,
      status: 'pending',
    })

    res.status(201).json(booking)
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Get customer bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.id })
      .populate({
        path: 'technicianId',
        populate: { path: 'userId', select: 'name phone' }
      })
      .sort({ createdAt: -1 })

    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Get technician bookings
const getTechnicianBookings = async (req, res) => {
  try {
    const technician = await Technician.findOne({ userId: req.user.id })
    if (!technician) {
      return res.status(404).json({ message: 'Technician फेला परेन!' })
    }

    const bookings = await Booking.find({ technicianId: technician._id })
      .populate('customerId', 'name phone email')
      .sort({ createdAt: -1 })

    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: 'Booking फेला परेन!' })
    }

    booking.status = status
    await booking.save()

    res.json(booking)
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

module.exports = {
  createBooking,
  getMyBookings,
  getTechnicianBookings,
  updateBookingStatus,
}