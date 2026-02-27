import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Navbar from '../../components/Navbar'

function TechnicianList() {
  const [technicians, setTechnicians] = useState([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(null)
  const [searchParams] = useSearchParams()
  const serviceId = searchParams.get('service')
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/technicians?service=${serviceId}`)
      .then(res => {
        setTechnicians(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [serviceId])

  return (
    <div style={{ background: '#020817', fontFamily: 'DM Sans, sans-serif' }} className="min-h-screen">
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <Navbar />

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(249,115,22,0.08), transparent)',
        }} className="absolute inset-0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-orange-400 text-sm transition mb-6"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            ← Back to Services
          </button>
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            Verified Technicians
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Available Technicians
          </h1>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Technicians khojirako cha...</p>
          </div>
        ) : technicians.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="text-5xl">🔍</span>
            <p className="text-slate-400 font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
              Koi technician available chaina ahile
            </p>
            <p className="text-slate-600 text-sm">Pछi feri check gara</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {technicians.map(tech => (
              <div
                key={tech._id}
                onClick={() => navigate(`/book/${tech._id}`)}
                onMouseEnter={() => setHovered(tech._id)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer rounded-2xl p-6 transition-all duration-300"
                style={{
                  background: hovered === tech._id
                    ? 'rgba(249,115,22,0.06)'
                    : 'rgba(15,23,42,0.6)',
                  border: hovered === tech._id
                    ? '1px solid rgba(249,115,22,0.25)'
                    : '1px solid rgba(255,255,255,0.05)',
                  transform: hovered === tech._id ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Top — Avatar + Info */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black transition-all duration-300"
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      background: hovered === tech._id
                        ? 'rgba(249,115,22,0.2)'
                        : 'rgba(249,115,22,0.1)',
                      color: '#f97316',
                      border: '1px solid rgba(249,115,22,0.2)',
                    }}
                  >
                    {tech.userId.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {tech.userId.name}
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
                    <p className="text-slate-500 text-xs">
                      {tech.skills.join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div
                  className="grid grid-cols-2 gap-3 mb-5 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="text-center">
                    <p className="text-orange-400 font-black text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>
                      ⭐ {tech.rating.average}
                    </p>
                    <p className="text-slate-600 text-xs">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-black text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>
                      {tech.experienceYears}yr
                    </p>
                    <p className="text-slate-600 text-xs">Experience</p>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    background: hovered === tech._id
                      ? 'linear-gradient(135deg, #f97316, #ea580c)'
                      : 'rgba(249,115,22,0.08)',
                    color: hovered === tech._id ? '#fff' : '#f97316',
                    border: hovered === tech._id
                      ? '1px solid transparent'
                      : '1px solid rgba(249,115,22,0.2)',
                    boxShadow: hovered === tech._id
                      ? '0 0 20px rgba(249,115,22,0.25)'
                      : 'none',
                  }}
                >
                  {hovered === tech._id ? 'Book Now →' : 'View & Book'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TechnicianList