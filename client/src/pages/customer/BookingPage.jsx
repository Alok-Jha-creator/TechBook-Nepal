import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../context/AuthContext'

function BookingPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [technician, setTechnician] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    date: '', time: '', address: '', problem: '',
  })

  useEffect(() => {
    api.get(`/technicians/${id}`)
      .then(res => {
        setTechnician(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleSubmit = async () => {
    if (!user) { navigate('/login'); return }
    if (!form.date || !form.time || !form.address) {
      alert('Sabai fields fill gara!')
      return
    }
    setSubmitting(true)
    try {
      await api.post('/bookings', {
        technicianId: id,
        scheduledAt: `${form.date}T${form.time}`,
        address: form.address,
        problem: form.problem,
      })
      alert('Booking successful!')
      navigate('/my-bookings')
    } catch {
      alert('Booking failed, feri try gara!')
    }
    setSubmitting(false)
  }

  if (loading) return (
    <div style={{ background: '#020817' }} className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

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

      <div className="max-w-2xl mx-auto px-6 py-12 relative">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-orange-400 text-sm transition mb-8"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          ← Back
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            Booking
          </p>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Book Technician
          </h1>
        </div>

        {/* Technician Card */}
        {technician && (
          <div
            className="rounded-2xl p-5 mb-6 flex items-center gap-4"
            style={{
              background: 'rgba(15,23,42,0.6)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black"
              style={{
                fontFamily: 'Syne, sans-serif',
                background: 'rgba(249,115,22,0.1)',
                color: '#f97316',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              {technician.userId.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {technician.userId.name}
                </h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: 'rgba(34,197,94,0.1)',
                    color: '#4ade80',
                    border: '1px solid rgba(34,197,94,0.2)',
                    fontFamily: 'Syne, sans-serif',
                  }}
                >
                  ✓ Verified
                </span>
              </div>
              <p className="text-slate-500 text-xs mb-1">{technician.skills.join(' · ')}</p>
              <p className="text-orange-400 text-xs font-semibold">⭐ {technician.rating.average} · {technician.experienceYears} years experience</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div
          className="rounded-2xl p-8 flex flex-col gap-6"
          style={{
            background: 'rgba(15,23,42,0.6)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ fontFamily: 'Syne, sans-serif', color: '#94a3b8' }}
              >
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ fontFamily: 'Syne, sans-serif', color: '#94a3b8' }}
              >
                Time
              </label>
              <input
                type="time"
                value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ fontFamily: 'Syne, sans-serif', color: '#94a3b8' }}
            >
              Address
            </label>
            <input
              type="text"
              placeholder="Timilro ghar ko address lekhnus..."
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-slate-600"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff',
                fontFamily: 'DM Sans, sans-serif',
              }}
            />
          </div>

          {/* Problem */}
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ fontFamily: 'Syne, sans-serif', color: '#94a3b8' }}
            >
              Problem Description
            </label>
            <textarea
              placeholder="Ke problem cha describe gara..."
              value={form.problem}
              onChange={e => setForm({ ...form, problem: e.target.value })}
              rows={4}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 resize-none"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff',
                fontFamily: 'DM Sans, sans-serif',
              }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontFamily: 'Syne, sans-serif',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              boxShadow: '0 0 30px rgba(249,115,22,0.25)',
            }}
          >
            {submitting ? 'Booking garirako cha...' : 'Confirm Booking →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingPage