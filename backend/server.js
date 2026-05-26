const express    = require('express')
const dotenv     = require('dotenv')
const cors       = require('cors')
const helmet     = require('helmet')
const morgan     = require('morgan')
const connectDB  = require('./config/db')

dotenv.config()
connectDB()

const app = express()

// ── Middleware ─────────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin:      'http://localhost:5173',
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Routes ─────────────────────────────────────────────────
app.use('/api/auth',        require('./routes/auth'))
app.use('/api/projects',    require('./routes/projects'))
app.use('/api/leads',       require('./routes/leads'))
app.use('/api/invoices',    require('./routes/invoices'))
app.use('/api/contracts',   require('./routes/contracts'))
app.use('/api/procurement', require('./routes/procurement'))

// ── Health Check ───────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status:  'OK',
    message: 'ConstructOS API is running',
    time:    new Date().toISOString(),
  })
})

// ── Error Handler ──────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`ConstructOS API running on port ${PORT}`)
})