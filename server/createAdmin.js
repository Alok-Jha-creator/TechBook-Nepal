const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

dotenv.config()

const User = require('./models/User')

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected!')

    const existing = await User.findOne({ email: 'admin@techbook.com' })
    if (existing) {
      console.log('Admin already exists!')
      process.exit()
    }

    const passwordHash = await bcrypt.hash('admin123', 10)

    await User.create({
      name: 'TechBook Admin',
      email: 'admin@techbook.com',
      phone: '9800000000',
      passwordHash,
      role: 'admin',
    })

    console.log('Admin created successfully!')
    console.log('Email: admin@techbook.com')
    console.log('Password: admin123')
    process.exit()
  } catch (err) {
    console.log('Error:', err.message)
    process.exit()
  }
}

createAdmin()