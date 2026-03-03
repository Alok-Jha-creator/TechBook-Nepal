const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Access denied — yo route ko lagi permission chaina!' 
      })
    }
    next()
  }
}

module.exports = roleMiddleware