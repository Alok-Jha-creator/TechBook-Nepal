import { useEffect, useState } from 'react'
import api from '../../services/api'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../context/AuthContext'

const statusConfig = {
  pending: { label: 'Pending', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
  accepted: { label: 'Accepted', color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)' },
  rejected: { label: 'Rejected', color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
  completed: { label: 'Completed', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)' },
  cancelled: { label: 'Cancelled', color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.2)' },
}

function Dashboard() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pending')

  useEffect(() => {
    api.get('/bookings/technician')
      .then(res => {
        setBookings(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleAction = async (bookingId, action) => {
    try {
      await api.patch(`/bookings/${bookingId}/status`, { status: action })
      setBookings(prev =>
        prev.map(b => b._id === bookingId ? { ...b, status: action } : b)
      )
    } catch {
      alert('Action failed, feri try gara!')
    }
  }

  const filtered = bookings.filter(b => b.status === activeTab)
  const counts = {
    pending: bookings.filter(b => b.status === 'pending').length,
    accepted: bookings.filter(b => b.status === 'accepted').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    rejected: bookings.filter(b => b.status === 'rejected').length,
  }

  const TABS = ['pending', 'accepted', 'completed', 'rejected']

  return (
    <div style={{ background: '#020817', fontFamily: 'DM Sans, sans-serif', minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <Navbar />

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(249,115,22,0.08), transparent)' }} className="absolute inset-0" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 relative">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
              Technician Portal
            </p>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 32, color: '#fff', marginBottom: 4 }}>
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ color: '#475569', fontSize: 14 }}>
              Timra sabai booking requests yaha dekhcha
            </p>
          </div>

          {/* Status badge */}
          <div style={{
            background: 'rgba(74,222,128,0.08)',
            border: '1px solid rgba(74,222,128,0.2)',
            borderRadius: 12,
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} className="animate-pulse" />
            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 12, fontWeight: 700, color: '#4ade80' }}>
              Online
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Pending', count: counts.pending, color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.15)' },
            { label: 'Accepted', count: counts.accepted, color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.15)' },
            { label: 'Completed', count: counts.completed, color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.15)' },
            { label: 'Rejected', count: counts.rejected, color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.15)' },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                background: stat.bg,
                border: `1px solid ${stat.border}`,
                borderRadius: 16,
                padding: '20px 24px',
              }}
            >
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 32, color: stat.color, marginBottom: 4 }}>
                {stat.count}
              </p>
              <p style={{ color: '#475569', fontSize: 13 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: 'rgba(255,255,255,0.03)', padding: 6, borderRadius: 14, border: '1px solid rgba(255,255,255,0.05)', width: 'fit-content' }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 20px',
                borderRadius: 10,
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeTab === tab ? 'rgba(249,115,22,0.15)' : 'transparent',
                color: activeTab === tab ? '#f97316' : '#475569',
                outline: activeTab === tab ? '1px solid rgba(249,115,22,0.3)' : 'none',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {counts[tab] > 0 && (
                <span style={{
                  marginLeft: 6,
                  background: activeTab === tab ? '#f97316' : 'rgba(255,255,255,0.08)',
                  color: activeTab === tab ? '#fff' : '#475569',
                  borderRadius: 20,
                  padding: '1px 7px',
                  fontSize: 11,
                }}>
                  {counts[tab]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: 16 }}>
            <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p style={{ color: '#475569', fontSize: 14 }}>Bookings load garirako cha...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: 12 }}>
            <span style={{ fontSize: 48 }}>📋</span>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#475569', fontSize: 16 }}>
              Koi {activeTab} booking chaina
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(booking => {
              const status = statusConfig[booking.status]
              return (
                <div
                  key={booking._id}
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
                  {/* Left — Customer info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: 'rgba(249,115,22,0.1)',
                      border: '1px solid rgba(249,115,22,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 18, color: '#f97316',
                    }}>
                      {booking.customerId.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 2 }}>
                        {booking.customerId.name}
                      </p>
                      <p style={{ color: '#475569', fontSize: 12 }}>{booking.customerId.phone}</p>
                    </div>
                  </div>

                  {/* Middle — Details */}
                  <div style={{ flex: 2, display: 'flex', gap: 24 }}>
                    <div>
                      <p style={{ color: '#475569', fontSize: 11, marginBottom: 3 }}>Date & Time</p>
                      <p style={{ color: '#94a3b8', fontSize: 13 }}>
                        📅 {new Date(booking.scheduledAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: '#475569', fontSize: 11, marginBottom: 3 }}>Address</p>
                      <p style={{ color: '#94a3b8', fontSize: 13 }}>📍 {booking.address}</p>
                    </div>
                    {booking.problem && (
                      <div>
                        <p style={{ color: '#475569', fontSize: 11, marginBottom: 3 }}>Problem</p>
                        <p style={{ color: '#94a3b8', fontSize: 13 }}>🔧 {booking.problem}</p>
                      </div>
                    )}
                  </div>

                  {/* Right — Status + Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                    <span style={{
                      fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700,
                      color: status.color, background: status.bg,
                      border: `1px solid ${status.border}`,
                      borderRadius: 20, padding: '4px 12px',
                    }}>
                      {status.label.toUpperCase()}
                    </span>

                    {booking.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => handleAction(booking._id, 'accepted')}
                          style={{ padding: '7px 16px', borderRadius: 10, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12, color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', cursor: 'pointer' }}
                        >
                          ✓ Accept
                        </button>
                        <button
                          onClick={() => handleAction(booking._id, 'rejected')}
                          style={{ padding: '7px 16px', borderRadius: 10, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12, color: '#f87171', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', cursor: 'pointer' }}
                        >
                          ✗ Reject
                        </button>
                      </div>
                    )}

                    {booking.status === 'accepted' && (
                      <button
                        onClick={() => handleAction(booking._id, 'completed')}
                        style={{ padding: '7px 16px', borderRadius: 10, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12, color: '#60a5fa', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', cursor: 'pointer' }}
                      >
                        ✓ Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard