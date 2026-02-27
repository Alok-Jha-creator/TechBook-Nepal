import api from './api'

export const customerLogin = (data) => api.post('/auth/customer/login', data)
export const customerRegister = (data) => api.post('/auth/customer/register', data)
export const technicianLogin = (data) => api.post('/auth/technician/login', data)
export const adminLogin = (data) => api.post('/auth/admin/login', data)