import { getAuthHeaders } from './auth.service.js'

const API_URL = `${import.meta.env.VITE_API_URL}/bookings`

export const createBooking = async ({ roomId, checkIn, checkOut, guests }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ roomId, checkIn, checkOut, guests }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Erreur lors de la réservation')
  return data
}

export const getMyBookings = async () => {
  const response = await fetch(`${API_URL}/me`, {
    headers: getAuthHeaders(),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Erreur lors du chargement des réservations')
  return data
}
