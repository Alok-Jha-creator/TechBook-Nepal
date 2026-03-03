const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')
const {
  getPendingTechnicians,
  getTechnicianDetail,
  approveTechnician,
  rejectTechnician,
  addService,
  deleteService,
  getServices,
} = require('../controllers/admin.controller')


const Service = require('../models/Service')

router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
    res.json(services)
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// Technician verification
router.get('/technicians/pending', authMiddleware, roleMiddleware('admin'), getPendingTechnicians)
router.get('/technicians/:id', authMiddleware, roleMiddleware('admin'), getTechnicianDetail)
router.patch('/technicians/:id/approve', authMiddleware, roleMiddleware('admin'), approveTechnician)
router.patch('/technicians/:id/reject', authMiddleware, roleMiddleware('admin'), rejectTechnician)

// Services
router.get('/services', getServices)
router.post('/services', authMiddleware, roleMiddleware('admin'), addService)
router.delete('/services/:id', authMiddleware, roleMiddleware('admin'), deleteService)

module.exports = router