const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/bookings', require('./routes/booking.routes'))
app.use('/api/technicians', require('./routes/technician.routes'))
app.use('/api/admin', require('./routes/admin.routes'))
app.use('/api/services', require('./routes/admin.routes'))

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!')
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    })
  })
  .catch(err => console.log('MongoDB error:', err))