const express = require('express')
const router = express.Router()
const uploadDocs = require('../middleware/upload.middleware')
const {
  customerRegister,
  customerLogin,
  technicianRegister,
  technicianLogin,
  adminLogin,
} = require('../controllers/auth.controller')

// Customer
router.post('/customer/register', customerRegister)
router.post('/customer/login', customerLogin)

// Technician
router.post('/technician/register', uploadDocs, technicianRegister)
router.post('/technician/login', technicianLogin)

// Admin
router.post('/admin/login', adminLogin)

module.exports = router