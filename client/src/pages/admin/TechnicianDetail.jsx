import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

function TechnicianDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [technician, setTechnician] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [rejectNote, setRejectNote] = useState('')
  const [showRejectInput, setShowRejectInput] = useState(false)

  useEffect(() => {
    api.get(`/admin/technicians/${id}`)
      .then(res => {
        setTechnician(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleApprove = async () => {
    setSubmitting(true)
    try {
      await api.patch(`/admin/technicians/${id}/approve`)
      alert('Technician approved!')
      navigate('/admin/verification')
    } catch {
      alert('Action failed!')
    }
    setSubmitting(false)
  }

  const handleReject = async () => {
    if (!rejectNote) { alert('Reject garne reason lekhnus!'); return }
    setSubmitting(true)
    try {
      await api.patch(`/admin/technicians/${id}/reject`, { adminNote: rejectNote })
      alert('Technician rejected!')
      navigate('/admin/verification')
    } catch {
      alert('Action failed!')
    }
    setSubmitting(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  if (loading) return (
    <div style={{ background: '#020817', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

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
                cursor: 'pointer', border: 'none', background: 'transparent', color: '#475569',
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

      <div className="max-w-6xl mx-auto px-6 py-10 relative">

        {/* Back */}
        <button
          onClick={() => navigate('/admin/verification')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24 }}
        >
          ← Back to Queue
        </button>

        {technician && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

            {/* LEFT — Info + Documents */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Basic Info Card */}
              <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 22, color: '#f97316',
                  }}>
                    {technician.userId.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, color: '#fff', fontSize: 18, marginBottom: 4 }}>
                      {technician.userId.name}
                    </p>
                    <span style={{
                      fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700,
                      color: '#fbbf24', background: 'rgba(251,191,36,0.08)',
                      border: '1px solid rgba(251,191,36,0.2)',
                      borderRadius: 20, padding: '3px 10px',
                    }}>
                      PENDING REVIEW
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Email', value: technician.userId.email },
                    { label: 'Phone', value: technician.userId.phone },
                    { label: 'Experience', value: `${technician.experienceYears} years` },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color: '#475569', fontSize: 13 }}>{item.label}</span>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: '#94a3b8', fontSize: 13 }}>{item.value}</span>
                    </div>
                  ))}
                  <div style={{ paddingTop: 8 }}>
                    <p style={{ color: '#475569', fontSize: 13, marginBottom: 8 }}>Skills</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {technician.skills.map(skill => (
                        <span key={skill} style={{
                          fontFamily: 'Syne, sans-serif', fontSize: 12, fontWeight: 600,
                          background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.15)',
                          color: '#f97316', borderRadius: 8, padding: '4px 12px',
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '24px' }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
                  Verification Documents
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { label: 'Citizenship Front', src: technician.verification.citizenshipFront },
                    { label: 'Citizenship Back', src: technician.verification.citizenshipBack },
                    { label: 'Selfie Photo', src: technician.verification.selfiePhoto },
                  ].map(doc => (
                    <div key={doc.label}>
                      <p style={{ color: '#475569', fontSize: 12, marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{doc.label}</p>
                      <img
                        src={doc.src}
                        alt={doc.label}
                        style={{ width: '100%', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', objectFit: 'cover', maxHeight: 180 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Action Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Action Card */}
              {technician.verification.status === 'pending' ? (
                <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '24px' }}>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
                    Verification Action
                  </p>
                  <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>
                    Documents hera ra decision gara. Approve garyo vane technician customer haru lai visible huncha.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button
                      onClick={handleApprove}
                      disabled={submitting}
                      style={{
                        width: '100%', padding: '14px', borderRadius: 12,
                        fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14,
                        color: '#4ade80', background: 'rgba(74,222,128,0.08)',
                        border: '1px solid rgba(74,222,128,0.2)',
                        cursor: 'pointer', opacity: submitting ? 0.5 : 1,
                      }}
                    >
                      ✅ Approve Technician
                    </button>

                    <button
                      onClick={() => setShowRejectInput(!showRejectInput)}
                      style={{
                        width: '100%', padding: '14px', borderRadius: 12,
                        fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14,
                        color: '#f87171', background: 'rgba(248,113,113,0.08)',
                        border: '1px solid rgba(248,113,113,0.2)',
                        cursor: 'pointer',
                      }}
                    >
                      ❌ Reject Technician
                    </button>

                    {showRejectInput && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                        <textarea
                          placeholder="Reject garne reason lekhnus..."
                          value={rejectNote}
                          onChange={e => setRejectNote(e.target.value)}
                          rows={3}
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(248,113,113,0.2)',
                            color: '#fff', fontFamily: 'DM Sans, sans-serif',
                            borderRadius: 10, padding: '12px 16px',
                            fontSize: 13, outline: 'none', resize: 'none', width: '100%',
                          }}
                        />
                        <button
                          onClick={handleReject}
                          disabled={submitting}
                          style={{
                            width: '100%', padding: '12px', borderRadius: 12,
                            fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14,
                            color: '#fff', background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            border: 'none', cursor: 'pointer', opacity: submitting ? 0.5 : 1,
                          }}
                        >
                          {submitting ? 'Submitting...' : 'Confirm Reject'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{
                  background: technician.verification.status === 'approved' ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                  border: technician.verification.status === 'approved' ? '1px solid rgba(74,222,128,0.2)' : '1px solid rgba(248,113,113,0.2)',
                  borderRadius: 16, padding: '24px', textAlign: 'center',
                }}>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: technician.verification.status === 'approved' ? '#4ade80' : '#f87171' }}>
                    {technician.verification.status === 'approved' ? '✅ Approved' : '❌ Rejected'}
                  </p>
                  {technician.verification.adminNote && (
                    <p style={{ color: '#475569', fontSize: 13, marginTop: 8 }}>
                      Note: {technician.verification.adminNote}
                    </p>
                  )}
                </div>
              )}

              {/* Tips Card */}
              <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '24px' }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
                  Verification Checklist
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'Citizenship photo clear cha?',
                    'Naam citizenship sanga match garcha?',
                    'Selfie ra citizenship same person ho?',
                    'Skills realistic lagcha?',
                  ].map((tip, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#f97316', flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <span style={{ color: '#64748b', fontSize: 13 }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TechnicianDetail