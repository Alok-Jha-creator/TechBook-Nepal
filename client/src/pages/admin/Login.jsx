import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

function AdminLogin() {
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
      const res = await api.post('/auth/admin/login', form)
      login(res.data.user, res.data.token)
      navigate('/admin/verification')
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed!')
    }
    setSubmitting(false)
  }

  const inp = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontFamily: 'DM Sans, sans-serif',
    width: '100%',
    borderRadius: '10px',
    padding: '11px 16px',
    fontSize: '14px',
    outline: 'none',
  }

  return (
    <div style={{ background: '#020817', fontFamily: 'DM Sans, sans-serif', height: '100vh', display: 'flex', overflow: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ background: 'radial-gradient(ellipse 80% 60% at 0% 50%, rgba(249,115,22,0.06), transparent)' }} className="absolute inset-0" />
        <div style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} className="absolute inset-0" />
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

        {/* LEFT */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.05)', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, background: '#f97316', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 13, boxShadow: '0 0 20px rgba(249,115,22,0.3)' }}>
              TB
            </div>
            <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 16 }}>
              Tech<span style={{ color: '#f97316' }}>Book</span>
              <span style={{ color: '#334155', fontWeight: 400, fontSize: 13, marginLeft: 4 }}>Nepal</span>
            </span>
          </div>

          {/* Middle */}
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
              Admin Portal
            </p>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 44, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
              Control<br />
              <span style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Center
              </span>
            </h1>
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>
              Technician verification, service management ra sabai platform activities yaha bata control gara.
            </p>

            {/* Features list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 40 }}>
              {[
                { icon: '🔐', label: 'Technician Verification' },
                { icon: '⚙️', label: 'Services Management' },
                { icon: '📊', label: 'Platform Overview' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                    {item.icon}
                  </div>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: '#64748b', fontSize: 14 }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p style={{ color: '#1e293b', fontSize: 12, fontFamily: 'Syne, sans-serif' }}>
            AUTHORIZED PERSONNEL ONLY
          </p>
        </div>

        {/* RIGHT — Form */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <div style={{ width: '100%', maxWidth: 420 }}>

            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 28, color: '#fff', marginBottom: 8 }}>
                Admin Login
              </h2>
              <p style={{ color: '#475569', fontSize: 14 }}>
                Authorized access only
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: 'Syne, sans-serif', fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="admin@techbook.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={inp}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: 'Syne, sans-serif', fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  style={inp}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  width: '100%', padding: '13px', borderRadius: 12,
                  fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14,
                  color: '#fff', background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 0 25px rgba(249,115,22,0.25)',
                  opacity: submitting ? 0.5 : 1,
                  marginTop: 8,
                }}
              >
                {submitting ? 'Login garirako cha...' : 'Access Admin Panel →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin