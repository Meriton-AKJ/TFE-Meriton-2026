import { getAuthHeaders } from './auth.service.js'

const API_URL = import.meta.env.VITE_API_URL

export const getStats = async () => {
  const res = await fetch(`${API_URL}/stats`, { headers: getAuthHeaders() })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`, { headers: getAuthHeaders() })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const getAllBookings = async () => {
  const res = await fetch(`${API_URL}/bookings`, { headers: getAuthHeaders() })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const updateBookingStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const updateUserRole = async (id, role) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ role }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const getContacts = async () => {
  const res = await fetch(`${API_URL}/contact`, { headers: getAuthHeaders() })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const markContactAsRead = async (id) => {
  const res = await fetch(`${API_URL}/contact/${id}/read`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Erreur lors de la suppression')
}

export const updateRoomImage = async (id, formData) => {
  const res = await fetch(`${API_URL}/rooms/${id}/upload`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    body: formData,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message)
  return json
}

export const createAdminBooking = async (data) => {
  const res = await fetch(`${API_URL}/bookings/admin`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message)
  return json
}
