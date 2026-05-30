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
  <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)' }}>

    {/* Grid overlay */}
    <div className="absolute inset-0"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
        backgroundSize: '48px 48px'
      }} />

    {/* Glow blobs */}
    <div className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(99,102,241,0.08) 0%, transparent 50%)'
      }} />

    <div className="relative z-10 w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
          <img
            src="https://kumbharconstructionanddevelopers.com/Favicon.png"
            alt="Company Logo"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="color:#fff;font-size:22px;font-weight:500">K</span>' }}
          />
        </div>
        <h1 className="text-lg font-medium text-white leading-snug">
          Kumbhar Construction<br />and Developers
        </h1>
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Construction Business Platform</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl p-8"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)'
        }}>
        <h2 className="text-sm font-medium mb-6" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Sign in to your account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.03em' }}>
              Email address
            </label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@constructos.com" required
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff'
              }}
              onFocus={e => { e.target.style.border = '1px solid rgba(99,102,241,0.6)'; e.target.style.background = 'rgba(255,255,255,0.08)' }}
              onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
            />
          </div>

          <div>
            <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.03em' }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full rounded-xl px-4 py-2.5 pr-10 text-sm outline-none transition"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff'
                }}
                onFocus={e => { e.target.style.border = '1px solid rgba(99,102,241,0.6)'; e.target.style.background = 'rgba(255,255,255,0.08)' }}
                onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition"
                style={{ color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs rounded-xl px-3 py-2"
              style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)', color: '#fca5a5' }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full font-medium rounded-xl py-2.5 text-sm text-white flex items-center justify-center gap-2 transition"
            style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)', border: 'none' }}>
            {loading && <Loader2 size={15} className="animate-spin" />}
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Quick login */}
        <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>Quick demo login:</p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_USERS.map((u) => (
              <button key={u.role} onClick={() => quickLogin(u)}
                className="text-left rounded-xl px-3 py-2 transition"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}>
                <p className="text-xs font-medium" style={{ color: 'rgba(99,149,255,0.9)' }}>{u.role.toUpperCase()}</p>
                <p className="text-xs truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{u.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
        ConstructOS v1.0 · All rights reserved
      </p>
    </div>
  </div>
)
}