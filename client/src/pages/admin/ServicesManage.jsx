import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const EMOJI_OPTIONS = ['❄️', '🔧', '⚡', '🏍️', '🪚', '📷', '🎨', '🧹', '🚿', '🔑', '📺', '🛁', '🌿', '🏠', '🔩']

function ServicesManage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [newService, setNewService] = useState({ name: '', icon: '' })
  const [adding, setAdding] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const navigate = useNavigate()
  const { logout } = useAuth()

  useEffect(() => {
    api.get('/services')
      .then(res => {
        setServices(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleAdd = async () => {
    if (!newService.name || !newService.icon) {
      alert('Naam ra icon dinus!')
      return
    }
    setAdding(true)
    try {
      const res = await api.post('/admin/services', newService)
      setServices(prev => [...prev, res.data])
      setNewService({ name: '', icon: '' })
    } catch {
      alert('Service add garna sakiena!')
    }
    setAdding(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Yo service delete garne?')) return
    try {
      await api.delete(`/admin/services/${id}`)
      setServices(prev => prev.filter(s => s._id !== id))
    } catch {
      alert('Delete garna sakiena!')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div style={{ background: '#020817', fontFamily: 'DM Sans, sans-serif', minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(249,115,22,0.08), transparent)' }} className="absolute inset-0" />
        <div style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} className="absolute inset-0" />
      </div>

      {/* Admin Navbar */}
      <nav style={{ background: 'rgba(2,8,23,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, background: '#f97316', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 12, boxShadow: '0 0 15px rgba(249,115,22,0.3)' }}>
            TB
          </div>
          <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 15 }}>
            Tech<span style={{ color: '#f97316' }}>Book</span>
            <span style={{ color: '#334155', fontWeight: 400, fontSize: 12, marginLeft: 4 }}>Admin</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { label: 'Verification', path: '/admin/verification' },
            { label: 'Services', path: '/admin/services' },
          ].map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                padding: '8px 18px', borderRadius: 10,
                fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13,
                cursor: 'pointer', border: 'none',
                background: window.location.pathname === item.path ? 'rgba(249,115,22,0.15)' : 'transparent',
                color: window.location.pathname === item.path ? '#f97316' : '#475569',
                outline: window.location.pathname === item.path ? '1px solid rgba(249,115,22,0.3)' : 'none',
              }}
            >
              {item.label}
            </button>
          ))}
          <button onClick={handleLogout} style={{ padding: '8px 18px', borderRadius: 10, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer', background: 'transparent', color: '#475569', border: 'none' }}>
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10 relative">

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
            Admin Panel
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 32, color: '#fff' }}>
              Services Manage
            </h1>
            <div style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 12, padding: '8px 16px' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>
                {services.length} Services
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24 }}>

          {/* LEFT — Add Service */}
          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '24px', height: 'fit-content' }}>
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
              Naya Service Add Gara
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Icon picker */}
              <div>
                <label style={{ fontFamily: 'Syne, sans-serif', fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                  Icon Select Gara
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {EMOJI_OPTIONS.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => setNewService({ ...newService, icon: emoji })}
                      style={{
                        width: 40, height: 40, borderRadius: 10, fontSize: 20,
                        cursor: 'pointer', border: 'none',
                        background: newService.icon === emoji ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.04)',
                        outline: newService.icon === emoji ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected preview */}
              {newService.icon && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.15)' }}>
                  <span style={{ fontSize: 24 }}>{newService.icon}</span>
                  <span style={{ color: '#f97316', fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 600 }}>
                    Selected
                  </span>
                </div>
              )}

              {/* Name input */}
              <div>
                <label style={{ fontFamily: 'Syne, sans-serif', fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                  Service Naam
                </label>
                <input
                  type="text"
                  placeholder="e.g. AC Repair"
                  value={newService.name}
                  onChange={e => setNewService({ ...newService, name: e.target.value })}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)', color: '#fff',
                    borderRadius: 10, padding: '11px 16px', fontSize: 14,
                    outline: 'none', fontFamily: 'DM Sans, sans-serif',
                  }}
                />
              </div>

              <button
                onClick={handleAdd}
                disabled={adding}
                style={{
                  width: '100%', padding: '12px', borderRadius: 12,
                  fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14,
                  color: '#fff', background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(249,115,22,0.2)',
                  opacity: adding ? 0.5 : 1,
                }}
              >
                {adding ? 'Adding...' : '+ Add Service'}
              </button>
            </div>
          </div>

          {/* RIGHT — Services List */}
          <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '24px' }}>
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
              Current Services
            </p>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : services.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <p style={{ color: '#475569', fontSize: 14 }}>Koi service chaina abhai</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {services.map(service => (
                  <div
                    key={service._id}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 16px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                        {service.icon}
                      </div>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: '#e2e8f0', fontSize: 14 }}>
                        {service.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(service._id)}
                      style={{
                        padding: '6px 14px', borderRadius: 8,
                        fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12,
                        color: '#f87171', background: 'rgba(248,113,113,0.08)',
                        border: '1px solid rgba(248,113,113,0.15)', cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesManage