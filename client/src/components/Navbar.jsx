import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(2, 8, 23, 0.95)'
            : 'rgba(2, 8, 23, 0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-sm group-hover:scale-110 transition-transform duration-300">
                TB
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#020817]" />
            </div>
            <span className="text-white font-black text-lg tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              Tech<span className="text-orange-500">Book</span>
              <span className="text-slate-500 font-normal text-sm ml-1">Nepal</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {!user ? (
              <>
                <Link
                  to="/"
                  className="relative px-4 py-2 text-sm transition-all duration-200 rounded-lg"
                  style={{
                    color: isActive('/') ? '#fff' : '#94a3b8',
                    background: isActive('/') ? 'rgba(255,255,255,0.06)' : 'transparent',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  Home
                </Link>

                <Link
                  to="/technician/register"
                  className="px-4 py-2 text-sm transition-all duration-200 rounded-lg"
                  style={{
                    color: isActive('/technician/register') ? '#fff' : '#94a3b8',
                    background: isActive('/technician/register') ? 'rgba(255,255,255,0.06)' : 'transparent',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  Join as Technician
                </Link>

                {/* CTA Button */}
                <Link
                  to="/technician/login"
                  className="relative overflow-hidden ml-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    boxShadow: '0 0 20px rgba(249,115,22,0.3)',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Technician Login
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, #fb923c, #f97316)' }}
                  />
                </Link>
              </>
            ) : user.role === 'customer' ? (
              <>
                <Link to="/" className="px-4 py-2 text-slate-400 hover:text-white text-sm rounded-lg hover:bg-white/5 transition">Home</Link>
                <Link to="/my-bookings" className="px-4 py-2 text-slate-400 hover:text-white text-sm rounded-lg hover:bg-white/5 transition">My Bookings</Link>

                <div className="flex items-center gap-3 ml-2 pl-3 border-l border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-300 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-lg transition-all duration-200"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : user.role === 'technician' ? (
              <>
                <Link to="/technician/dashboard" className="px-4 py-2 text-slate-400 hover:text-white text-sm rounded-lg hover:bg-white/5 transition">Dashboard</Link>

                <div className="flex items-center gap-3 ml-2 pl-3 border-l border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-300 text-sm">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-lg transition-all duration-200"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 flex flex-col gap-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <Link to="/" className="text-slate-400 hover:text-white text-sm py-3 border-b border-white/5 transition">Home</Link>
            <Link to="/technician/register" className="text-slate-400 hover:text-white text-sm py-3 border-b border-white/5 transition">Join as Technician</Link>
            <Link
              to="/technician/login"
              className="mt-2 text-center bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold py-3 rounded-xl transition"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Technician Login →
            </Link>
          </div>
        )}
      </nav>

      {/* Spacer — fixed navbar ko lagi */}
      <div className="h-[73px]" />
    </>
  )
}

export default Navbar