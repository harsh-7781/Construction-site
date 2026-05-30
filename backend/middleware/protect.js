import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized. No token provided.' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).json({ message: 'User no longer exists.' })
    if (!user.isActive) return res.status(403).json({ message: 'Account deactivated.' })

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired.' })
  }
}

// Role-based access — usage: authorize('ceo', 'cfo')
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role '${req.user.role}' is not allowed to access this route.`
      })
    }
    next()
  }
}