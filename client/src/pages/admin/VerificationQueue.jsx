import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

function VerificationQueue() {
  const [technicians, setTechnicians] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { logout } = useAuth()

  useEffect(() => {
    api.get('/admin/technicians/pending')
      .then(res => {
        setTechnicians(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

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
                cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                background: window.location.pathname === item.path ? 'rgba(249,115,22,0.15)' : 'transparent',
                color: window.location.pathname === item.path ? '#f97316' : '#475569',
                outline: window.location.pathname === item.path ? '1px solid rgba(249,115,22,0.3)' : 'none',
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            style={{ padding: '8px 18px', borderRadius: 10, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer', background: 'transparent', color: '#475569', border: 'none' }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10 relative">

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
            Admin Panel
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 32, color: '#fff' }}>
              Verification Queue
            </h1>
            <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 12, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>
                {technicians.length} Pending
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: 16 }}>
            <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p style={{ color: '#475569', fontSize: 14 }}>Loading...</p>
          </div>
        ) : technicians.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: 12 }}>
            <span style={{ fontSize: 48 }}>✅</span>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#475569', fontSize: 16 }}>
              Koi pending verification chaina
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {technicians.map((tech, i) => (
              <div
                key={tech._id}
                style={{
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 16,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                {/* Left */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(249,115,22,0.1)',
                    border: '1px solid rgba(249,115,22,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 18, color: '#f97316',
                  }}>
                    {tech.userId.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 2 }}>
                      {tech.userId.name}
                    </p>
                    <p style={{ color: '#475569', fontSize: 12 }}>
                      {tech.userId.email} · {tech.userId.phone}
                    </p>
                  </div>
                </div>

                {/* Middle */}
                <div style={{ display: 'flex', gap: 24, flex: 1, justifyContent: 'center' }}>
                  <div>
                    <p style={{ color: '#475569', fontSize: 11, marginBottom: 4 }}>Skills</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {tech.skills.map(skill => (
                        <span
                          key={skill}
                          style={{
                            fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 600,
                            background: 'rgba(249,115,22,0.08)',
                            border: '1px solid rgba(249,115,22,0.15)',
                            color: '#f97316', borderRadius: 6, padding: '2px 8px',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p style={{ color: '#475569', fontSize: 11, marginBottom: 4 }}>Experience</p>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#94a3b8', fontSize: 14 }}>
                      {tech.experienceYears} years
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700,
                    color: '#fbbf24', background: 'rgba(251,191,36,0.08)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    borderRadius: 20, padding: '4px 12px',
                  }}>
                    PENDING
                  </span>
                  <button
                    onClick={() => navigate(`/admin/technician/${tech._id}`)}
                    style={{
                      padding: '9px 20px', borderRadius: 10,
                      fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13,
                      color: '#fff', background: 'linear-gradient(135deg, #f97316, #ea580c)',
                      border: 'none', cursor: 'pointer',
                      boxShadow: '0 0 15px rgba(249,115,22,0.2)',
                    }}
                  >
                    Review →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VerificationQueue