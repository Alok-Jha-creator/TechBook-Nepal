import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Navbar from '../../components/Navbar'

const FALLBACK_SERVICES = [
  { _id: '1', name: 'AC Repair', icon: '❄️' },
  { _id: '2', name: 'Plumber', icon: '🔧' },
  { _id: '3', name: 'Electrician', icon: '⚡' },
  { _id: '4', name: 'Bike Repair', icon: '🏍️' },
  { _id: '5', name: 'Carpenter', icon: '🪚' },
  { _id: '6', name: 'CCTV Installation', icon: '📷' },
  { _id: '7', name: 'Painting', icon: '🎨' },
  { _id: '8', name: 'Cleaning', icon: '🧹' },
]

const STATS = [
  { value: '500+', label: 'Verified Technicians' },
  { value: '10K+', label: 'Bookings Done' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '24/7', label: 'Support' },
]

const HOW_IT_WORKS = [
  { step: '01', icon: '🔍', title: 'Choose a Service', desc: 'AC Repair, Plumber, Electrician — sabai categories available cha' },
  { step: '02', icon: '👨‍🔧', title: 'Pick a Technician', desc: 'Verified profiles, real ratings, ra experience hera ani choose gara' },
  { step: '03', icon: '📅', title: 'Book & Confirm', desc: 'Date, time, address fill gara ani booking confirm gara' },
  { step: '04', icon: '✅', title: 'Problem Solved!', desc: 'Technician timro ghar aaucha ra kaam garcha' },
]

function Home() {
  const [services, setServices] = useState(FALLBACK_SERVICES)
  const [hoveredService, setHoveredService] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/services')
      .then(res => { if (res.data.length > 0) setServices(res.data) })
      .catch(() => { })
  }, [])

  return (
    <div style={{ background: '#020817', fontFamily: 'DM Sans, sans-serif' }} className="min-h-screen">
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% -10%, rgba(249,115,22,0.12), transparent)',
          }} className="absolute inset-0" />
          <div style={{
            background: 'radial-gradient(ellipse 40% 40% at 90% 50%, rgba(249,115,22,0.05), transparent)',
          }} className="absolute inset-0" />
          {/* Grid pattern */}
          <div style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} className="absolute inset-0" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(249,115,22,0.08)',
                border: '1px solid rgba(249,115,22,0.2)',
                color: '#fb923c',
                fontFamily: 'Syne, sans-serif',
                letterSpacing: '0.1em',
              }}
            >
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
              NEPAL'S #1 VERIFIED TECHNICIAN PLATFORM
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl font-black text-center text-white mb-6"
            style={{ fontFamily: 'Syne, sans-serif', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Ghar Baisera<br />
            <span style={{
              background: 'linear-gradient(135deg, #f97316, #fb923c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Book Gara
            </span>
          </h1>

          <p className="text-slate-400 text-center text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Verified technicians timro ghar aaucha. Citizenship verified, admin approved — fake profiles bilkul chaina.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <button
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: 'Syne, sans-serif',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                boxShadow: '0 0 30px rgba(249,115,22,0.3)',
              }}
            >
              Book a Technician →
            </button>
            <button
              onClick={() => navigate('/technician/register')}
              className="px-8 py-4 rounded-xl font-bold text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: 'Syne, sans-serif',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              Join as Technician
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            {STATS.map(stat => (
              <div
                key={stat.label}
                className="text-center py-8 px-4"
                style={{ background: '#020817' }}
              >
                <p
                  className="text-3xl font-black text-white mb-1"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-slate-500 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div id="services" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-3"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            What We Offer
          </p>
          <h2
            className="text-3xl md:text-4xl font-black text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <div
              key={service._id}
              onClick={() => navigate(`/technicians?service=${service._id}`)}
              onMouseEnter={() => setHoveredService(service._id)}
              onMouseLeave={() => setHoveredService(null)}
              className="cursor-pointer rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300"
              style={{
                background: hoveredService === service._id
                  ? 'rgba(249,115,22,0.08)'
                  : 'rgba(15,23,42,0.6)',
                border: hoveredService === service._id
                  ? '1px solid rgba(249,115,22,0.3)'
                  : '1px solid rgba(255,255,255,0.05)',
                transform: hoveredService === service._id ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300"
                style={{
                  background: hoveredService === service._id
                    ? 'rgba(249,115,22,0.15)'
                    : 'rgba(255,255,255,0.04)',
                }}
              >
                {service.icon}
              </div>
              <p
                className="text-sm font-semibold text-center transition-colors duration-300"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  color: hoveredService === service._id ? '#fff' : '#94a3b8',
                }}
              >
                {service.name}
              </p>
              <span
                className="text-xs transition-all duration-300"
                style={{
                  color: hoveredService === service._id ? '#f97316' : 'transparent',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                Book Now →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-3"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Simple Process
            </p>
            <h2
              className="text-3xl md:text-4xl font-black text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={item.step} className="relative">
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-[60%] w-full h-px"
                    style={{ background: 'linear-gradient(90deg, rgba(249,115,22,0.3), transparent)' }}
                  />
                )}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'rgba(15,23,42,0.6)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-4xl font-black"
                      style={{ fontFamily: 'Syne, sans-serif', color: 'rgba(249,115,22,0.2)' }}
                    >
                      {item.step}
                    </span>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3
                    className="text-white font-bold mb-2"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div
          className="rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,88,12,0.05))',
            border: '1px solid rgba(249,115,22,0.2)',
          }}
        >
          <div style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(249,115,22,0.08), transparent)',
          }} className="absolute inset-0 pointer-events-none" />
          <h2
            className="text-3xl md:text-4xl font-black text-white mb-4 relative"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Are You a Technician ?
          </h2>
          <p className="text-slate-400 mb-8 relative">
            TechBook Nepal ma join gara — verified ban ra customers paunus
          </p>
          <button
            onClick={() => navigate('/technician/register')}
            className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 relative"
            style={{
              fontFamily: 'Syne, sans-serif',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              boxShadow: '0 0 30px rgba(249,115,22,0.3)',
            }}
          >
            Register as Technician →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(15,23,42,0.4)' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, background: '#f97316', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 13, boxShadow: '0 0 20px rgba(249,115,22,0.3)' }}>
                  TB
                </div>
                <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 18 }}>
                  Tech<span style={{ color: '#f97316' }}>Book</span>
                  <span style={{ color: '#334155', fontWeight: 400, fontSize: 13, marginLeft: 4 }}>Nepal</span>
                </span>
              </div>
              <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7, maxWidth: 280 }}>
                Nepal ko sabai vanda trusted technician booking platform. Verified professionals, doorstep service.
              </p>
              {/* Social links */}
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                {['Facebook', 'Instagram', 'Twitter'].map(social => (
                  <div
                    key={social}
                    style={{
                      padding: '6px 14px', borderRadius: 8,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: '#475569', fontSize: 12,
                      fontFamily: 'Syne, sans-serif', fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {social}
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12, color: '#f97316', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Services
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['AC Repair', 'Plumber', 'Electrician', 'Bike Repair', 'Carpenter', 'CCTV'].map(s => (
                  <span key={s} style={{ color: '#475569', fontSize: 13, cursor: 'pointer' }}
                    onMouseEnter={e => e.target.style.color = '#94a3b8'}
                    onMouseLeave={e => e.target.style.color = '#475569'}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12, color: '#f97316', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Company
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['About Us', 'How it Works', 'Careers', 'Blog', 'Press'].map(s => (
                  <span key={s} style={{ color: '#475569', fontSize: 13, cursor: 'pointer' }}
                    onMouseEnter={e => e.target.style.color = '#94a3b8'}
                    onMouseLeave={e => e.target.style.color = '#475569'}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12, color: '#f97316', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Contact
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: '📧', text: 'hello@techbook.com.np' },
                  { icon: '📞', text: '+977 9800000000' },
                  { icon: '📍', text: 'Kathmandu, Nepal' },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14 }}>{item.icon}</span>
                    <span style={{ color: '#475569', fontSize: 13 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#475569', fontSize: 12 }}>
              © 2025 TechBook Nepal. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy Policy', 'Terms of Service'].map(item => (
                <span key={item} style={{ color: '#475569', fontSize: 12, cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = '#94a3b8'}
                  onMouseLeave={e => e.target.style.color = '#475569'}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home