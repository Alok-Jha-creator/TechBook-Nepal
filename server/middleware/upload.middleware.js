const { upload } = require('../utils/cloudinary')

const uploadDocs = upload.fields([
  { name: 'citizenshipFront', maxCount: 1 },
  { name: 'citizenshipBack', maxCount: 1 },
  { name: 'selfie', maxCount: 1 },
])

module.exports = uploadDocs