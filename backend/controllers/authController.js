import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ message: 'Please provide email and password.' })

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password.' })

    if (!user.isActive)
      return res.status(403).json({ message: 'Account deactivated. Contact admin.' })

    const token = signToken(user._id)

    res.status(200).json({
      success: true,
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        title: user.title,
      },
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
}

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id:    req.user._id,
        name:  req.user.name,
        email: req.user.email,
        role:  req.user.role,
        title: req.user.title,
      },
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
}

// POST /api/auth/logout (client just deletes token, this is optional)
export const logout = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully.' })
}