const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Technician = require('../models/Technician')

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// Customer Register
const customerRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already registered!' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name, email, phone, passwordHash, role: 'customer'
    })

    const token = generateToken(user)

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Customer Login
const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email, role: 'customer' })
    if (!user) {
      return res.status(400).json({ message: 'Email ya password galat!' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ya password galat!' })
    }

    const token = generateToken(user)

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Technician Register
const technicianRegister = async (req, res) => {
  try {
    const { name, email, phone, password, experienceYears, skills } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already registered!' })
    }

    if (!req.files?.citizenshipFront || !req.files?.citizenshipBack || !req.files?.selfie) {
      return res.status(400).json({ message: 'Sabai documents upload gara!' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name, email, phone, passwordHash, role: 'technician'
    })

    const technician = await Technician.create({
      userId: user._id,
      skills: JSON.parse(skills),
      experienceYears: Number(experienceYears),
      verification: {
        status: 'pending',
        citizenshipFront: req.files.citizenshipFront[0].path,
        citizenshipBack: req.files.citizenshipBack[0].path,
        selfiePhoto: req.files.selfie[0].path,
      },
      isVisible: false,
    })

    res.status(201).json({ message: 'Registration successful! Admin approval ko lagi wait gara.' })
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Technician Login
const technicianLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email, role: 'technician' })
    if (!user) {
      return res.status(400).json({ message: 'Email ya password galat!' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ya password galat!' })
    }

    const technician = await Technician.findOne({ userId: user._id })
    if (!technician || technician.verification.status !== 'approved') {
      return res.status(403).json({ message: 'Admin le abhai approve gareko chaina!' })
    }

    const token = generateToken(user)

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email, role: 'admin' })
    if (!user) {
      return res.status(400).json({ message: 'Email ya password galat!' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ya password galat!' })
    }

    const token = generateToken(user)

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

module.exports = {
  customerRegister,
  customerLogin,
  technicianRegister,
  technicianLogin,
  adminLogin,
}