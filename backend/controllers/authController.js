const jwt  = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

// @POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' })
    }

    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    if (user.status === 'inactive') {
      return res.status(401).json({ success: false, message: 'Account deactivated' })
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        title: user.title,
      },
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// @GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json({ success: true, user })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// @POST /api/auth/register (admin only — seed users)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, title } = req.body
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ success: false, message: 'User already exists' })
    }
    const user = await User.create({ name, email, password, role, title })
    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}