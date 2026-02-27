import { useEffect, useState } from 'react'
import api from '../../services/api'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/bookings/my')
      .then(res => {
        setBookings(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const statusConfig = {
    pending: { label: 'Pending', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
    accepted: { label: 'Accepted', color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)' },
    rejected: { label: 'Rejected', color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
    completed: { label: 'Completed', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)' },
    cancelled: { label: 'Cancelled', color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.2)' },
  }

  return (
    <div style={{ background: '#020817', fontFamily: 'DM Sans, sans-serif' }} className="min-h-screen">
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <Navbar />

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(249,115,22,0.08), transparent)',
        }} className="absolute inset-0" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 relative">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            History
          </p>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            My Bookings
          </h1>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Bookings load garirako cha...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="text-5xl">📋</span>
            <p className="text-slate-400 font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
              Koi booking chaina abhai
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
              style={{
                fontFamily: 'Syne, sans-serif',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
              }}
            >
              Book a Technician →
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map(booking => {
              const status = statusConfig[booking.status] || statusConfig.pending
              return (
                <div
                  key={booking._id}
                  className="rounded-2xl p-6 transition-all duration-300"
                  style={{
                    background: 'rgba(15,23,42,0.6)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg"
                        style={{
                          fontFamily: 'Syne, sans-serif',
                          background: 'rgba(249,115,22,0.1)',
                          color: '#f97316',
                          border: '1px solid rgba(249,115,22,0.2)',
                        }}
                      >
                        {booking.technicianId.userId.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="font-bold text-white text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
                          {booking.technicianId.userId.name}
                        </h2>
                        <p className="text-slate-500 text-xs">
                          {booking.technicianId.skills.join(' · ')}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        color: status.color,
                        background: status.bg,
                        border: `1px solid ${status.border}`,
                      }}
                    >
                      {status.label.toUpperCase()}
                    </span>
                  </div>

                  {/* Details */}
                  <div
                    className="rounded-xl p-4 flex flex-col gap-2"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="text-base">📅</span>
                      {new Date(booking.scheduledAt).toLocaleString('ne-NP', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="text-base">📍</span>
                      {booking.address}
                    </div>
                    {booking.problem && (
                      <div className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-base">🔧</span>
                        {booking.problem}
                      </div>
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

export default MyBookings