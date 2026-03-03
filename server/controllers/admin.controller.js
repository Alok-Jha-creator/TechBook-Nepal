const User = require('../models/User')
const Technician = require('../models/Technician')
const Service = require('../models/Service')

// Get pending technicians
const getPendingTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find({
      'verification.status': 'pending'
    }).populate('userId', 'name email phone')

    res.json(technicians)
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Get single technician detail
const getTechnicianDetail = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id)
      .populate('userId', 'name email phone')

    if (!technician) {
      return res.status(404).json({ message: 'Technician फेला परेन!' })
    }

    res.json(technician)
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Approve technician
const approveTechnician = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id)

    if (!technician) {
      return res.status(404).json({ message: 'Technician फेला परेन!' })
    }

    technician.verification.status = 'approved'
    technician.verification.reviewedAt = new Date()
    technician.isVisible = true
    await technician.save()

    res.json({ message: 'Technician approved!' })
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Reject technician
const rejectTechnician = async (req, res) => {
  try {
    const { adminNote } = req.body
    const technician = await Technician.findById(req.params.id)

    if (!technician) {
      return res.status(404).json({ message: 'Technician फेला परेन!' })
    }

    technician.verification.status = 'rejected'
    technician.verification.adminNote = adminNote
    technician.verification.reviewedAt = new Date()
    technician.isVisible = false
    await technician.save()

    res.json({ message: 'Technician rejected!' })
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Add service
const addService = async (req, res) => {
  try {
    const { name, icon } = req.body

    const service = await Service.create({ name, icon })
    res.status(201).json(service)
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Delete service
const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id)
    res.json({ message: 'Service deleted!' })
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Get all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
    res.json(services)
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

module.exports = {
  getPendingTechnicians,
  getTechnicianDetail,
  approveTechnician,
  rejectTechnician,
  addService,
  deleteService,
  getServices,
}