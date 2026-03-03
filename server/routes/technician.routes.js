const express = require('express')
const router = express.Router()
const {
  getTechniciansByService,
  getTechnicianById,
} = require('../controllers/technician.controller')

const { getServices } = require('../controllers/admin.controller')

// Services
router.get('/services', getServices)

// Technicians
router.get('/', getTechniciansByService)
router.get('/:id', getTechnicianById)

module.exports = router