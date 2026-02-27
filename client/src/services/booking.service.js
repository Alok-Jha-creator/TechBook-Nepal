import api from './api'

export const createBooking = (data) => api.post('/bookings', data)
export const getMyBookings = () => api.get('/bookings/my')
export const getTechnicianBookings = () => api.get('/bookings/technician')
export const updateBookingStatus = (id, status) => api.patch(`/bookings/${id}/status`, { status })