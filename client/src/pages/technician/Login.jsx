import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      alert('Sabai fields fill gara!')
      return
    }
    setSubmitting(true)
    try {
      const res = await api.post('/auth/technician/login', form)
      login(res.data.user, res.data.token)
      navigate('/technician/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed!')
    }
    setSubmitting(false)
  }

  return (
    <div style={{ background: '#020817', fontFamily: 'DM Sans, sans-serif' }} className="min-h-screen flex items-center justify-center px-4">
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(249,115,22,0.1), transparent)',
        }} className="absolute inset-0" />
      </div>

      <div className="w-full max-w-md relative">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-lg mb-4"
            style={{ fontFamily: 'Syne, sans-serif', boxShadow: '0 0 30px rgba(249,115,22,0.3)' }}
          >
            TB
          </div>
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            Technician Portal
          </p>
          <h1 className="text-3xl font-black text-white text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Welcome Back
          </h1>
          
        </div>

        {/* Form Card */}
        <div
          className="rounded-2xl p-8 flex flex-col gap-5"
          style={{
            background: 'rgba(15,23,42,0.6)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400" style={{ fontFamily: 'Syne, sans-serif' }}>
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-slate-600"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff',
              }}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400" style={{ fontFamily: 'Syne, sans-serif' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-slate-600"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff',
              }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            style={{
              fontFamily: 'Syne, sans-serif',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              boxShadow: '0 0 30px rgba(249,115,22,0.25)',
            }}
          >
            {submitting ? 'Login garirako cha...' : 'Login →'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-slate-600 text-xs">or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <p className="text-center text-slate-500 text-sm">
            New technician?{' '}
            <Link to="/technician/register" className="text-orange-500 hover:text-orange-400 font-semibold transition">
              Register here →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login