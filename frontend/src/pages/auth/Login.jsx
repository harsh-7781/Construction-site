import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

const DEMO_USERS = [
  { email: 'ceo@constructos.com',        password: 'demo123', role: 'ceo',        name: 'Harsh Devadkar',   title: 'Chief Executive Officer' },
  { email: 'cfo@constructos.com',        password: 'demo123', role: 'cfo',        name: 'Priya Sharma',     title: 'Chief Financial Officer' },
  { email: 'cto@constructos.com',        password: 'demo123', role: 'cto',        name: 'Arjun Patel',      title: 'Chief Technology Officer' },
  { email: 'pm@constructos.com',         password: 'demo123', role: 'pm',         name: 'Sneha Desai',      title: 'Project Manager' },
  { email: 'supervisor@constructos.com', password: 'demo123', role: 'supervisor', name: 'Vikram Singh',     title: 'Site Supervisor' },
]

// 👇 REPLACE THIS URL WITH YOUR OWN IMAGE ADDRESS
// Examples:
// - Google Photos: https://lh3.googleusercontent.com/... (direct link)
// - Imgur: https://i.imgur.com/your-image.png
// - Local file: '/logo.png' (place in public folder)
// - Any CDN or cloud storage URL
// const CUSTOM_LOGO_URL = 'https://your-image-url.com/logo.png'  // <-- CHANGE THIS

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const login    = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise((r) => setTimeout(r, 800))

    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (found) {
      login(found)
      navigate('/')
    } else {
      setError('Invalid email or password.')
    }
    setLoading(false)
  }

  const quickLogin = (user) => {
    setEmail(user.email)
    setPassword(user.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size:[48px_48px]" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg mb-4 overflow-hidden">
            <img 
              src={"https://kumbharconstructionanddevelopers.com/Favicon.png"} 
              alt="Company Logo" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<span class="text-white text-2xl font-bold">C</span>'
              }}
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Kumbhar Construction and Developers
          </h1>
          {/* <p className="text-gray-500 text-sm mt-1">Construction Business Platform</p> */}
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-xl">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Sign in to your account</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@constructos.com"
                required
                className="w-full bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white font-medium rounded-lg py-2.5 text-sm transition flex items-center justify-center gap-2 shadow-md"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Quick login */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3">Quick demo login:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.role}
                  onClick={() => quickLogin(u)}
                  className="text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-lg px-3 py-2 transition"
                >
                  <p className="text-xs font-medium text-gray-700 capitalize">{u.role.toUpperCase()}</p>
                  <p className="text-xs text-gray-500 truncate">{u.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          ConstructOS v1.0 · All rights reserved
        </p>
      </div>
    </div>
  )
}