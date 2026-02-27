import api from './api'

export const getTechniciansByService = (serviceId) => api.get(`/technicians?service=${serviceId}`)
export const getTechnicianById = (id) => api.get(`/technicians/${id}`)
export const getPendingTechnicians = () => api.get('/admin/technicians/pending')
export const approveTechnician = (id) => api.patch(`/admin/technicians/${id}/approve`)
export const rejectTechnician = (id, note) => api.patch(`/admin/technicians/${id}/reject`, { adminNote: note })