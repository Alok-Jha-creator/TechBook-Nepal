import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Customer pages
import Home from './pages/customer/Home'
import TechnicianList from './pages/customer/TechnicianList'
import BookingPage from './pages/customer/BookingPage'
import MyBookings from './pages/customer/MyBookings'

// Technician pages
import TechnicianLogin from './pages/technician/Login'
import TechnicianRegister from './pages/technician/Register'
import TechnicianDashboard from './pages/technician/Dashboard'

// Admin pages
import AdminLogin from './pages/admin/Login'
import VerificationQueue from './pages/admin/VerificationQueue'
import TechnicianDetail from './pages/admin/TechnicianDetail'
import ServicesManage from './pages/admin/ServicesManage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/technicians" element={<TechnicianList />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* Technician Routes */}
        <Route path="/technician/login" element={<TechnicianLogin />} />
        <Route path="/technician/register" element={<TechnicianRegister />} />
        <Route path="/technician/dashboard" element={<TechnicianDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/verification" element={<VerificationQueue />} />
        <Route path="/admin/technician/:id" element={<TechnicianDetail />} />
        <Route path="/admin/services" element={<ServicesManage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App