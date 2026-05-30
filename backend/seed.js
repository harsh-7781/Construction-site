import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

const users = [
  {
    name:     'Harsh Devadkar',
    email:    'harsh@kumbhar.com',
    password: 'Harsh@Kumbhar#2025!',
    role:     'ceo',
    title:    'Chief Executive Officer',
  },
  {
    name:     'Priya Sharma',
    email:    'priya@kumbhar.com',
    password: 'Priya$Finance#99!',
    role:     'cfo',
    title:    'Chief Financial Officer',
  },
  {
    name:     'Arjun Patel',
    email:    'arjun@kumbhar.com',
    password: 'Arjun@Tech#CTO07!',
    role:     'cto',
    title:    'Chief Technology Officer',
  },
  {
    name:     'Sneha Desai',
    email:    'sneha@kumbhar.com',
    password: 'Sneha$Project#21!',
    role:     'pm',
    title:    'Project Manager',
  },
  {
    name:     'Vikram Singh',
    email:    'vikram@kumbhar.com',
    password: 'Vikram@Site#88!',
    role:     'supervisor',
    title:    'Site Supervisor',
  },
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB connected')

    await User.deleteMany()
    console.log('🗑️  Old users deleted')

    await User.insertMany(users)
    console.log('✅ Users seeded successfully:')
    users.forEach((u) => console.log(`   → ${u.role.toUpperCase()}: ${u.email}`))

    process.exit(0)
  } catch (err) {
    console.error('❌ Seed error:', err.message)
    process.exit(1)
  }
}

seedDB()