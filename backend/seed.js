const mongoose = require('mongoose')
const dotenv   = require('dotenv')
const User     = require('./models/User')

dotenv.config()

const users = [
  { name:'Rajesh Mehta',  email:'ceo@constructos.com',        password:'demo123', role:'ceo',        title:'Chief Executive Officer'  },
  { name:'Priya Sharma',  email:'cfo@constructos.com',        password:'demo123', role:'cfo',        title:'Chief Financial Officer'  },
  { name:'Arjun Patel',   email:'cto@constructos.com',        password:'demo123', role:'cto',        title:'Chief Technology Officer' },
  { name:'Sneha Desai',   email:'pm@constructos.com',         password:'demo123', role:'pm',         title:'Project Manager'          },
  { name:'Vikram Singh',  email:'supervisor@constructos.com', password:'demo123', role:'supervisor', title:'Site Supervisor'          },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    await User.deleteMany({})
    await User.create(users)
    console.log('✅ Users seeded successfully')
    console.log('📧 Login with: ceo@constructos.com / demo123')
    process.exit(0)
  } catch (err) {
    console.error('Seed error:', err)
    process.exit(1)
  }
}

seed()