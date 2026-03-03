const Technician = require('../models/Technician')

// Get technicians by service
const getTechniciansByService = async (req, res) => {
  try {
    const { service } = req.query

    // Service ID le pani, naam le pani search garne
    const Service = require('../models/Service')
    let skillFilter = service

    // Check if it's an ObjectId
    if (service && service.length === 24) {
      const serviceDoc = await Service.findById(service)
      if (serviceDoc) {
        skillFilter = serviceDoc.name
      }
    }

    const technicians = await Technician.find({
      isVisible: true,
      skills: { $in: [skillFilter] },
    }).populate('userId', 'name email phone')

    res.json(technicians)
  } catch (err) {
    res.status(500).json({ message: 'Server error!', error: err.message })
  }
}

// Get single technician
const getTechnicianById = async (req, res) => {
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

module.exports = {
  getTechniciansByService,
  getTechnicianById,
}