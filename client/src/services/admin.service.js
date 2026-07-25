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
