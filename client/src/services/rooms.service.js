const API_URL = import.meta.env.VITE_API_URL

export const getRooms = async () => {
  const response = await fetch(`${API_URL}/rooms`)
  if (!response.ok) throw new Error('Failed to fetch all rooms')
  return response.json()
}

export const getRoom = async (id) => {
  const response = await fetch(`${API_URL}/rooms/${id}`)
  if (!response.ok) throw new Error('Failed to fetch the room')
  return response.json()
}

export const createRoom = async (room) => {
  const response = await fetch(`${API_URL}/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(room),
  })
  if (!response.ok) throw new Error('Failed to create the room')
  return response.json()
}

export const updateRoom = async (id, room) => {
  const response = await fetch(`${API_URL}/rooms/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(room),
  })
  if (!response.ok) throw new Error('Failed to update the room')
  return response.json()
}

export const deleteRoom = async (id) => {
  const response = await fetch(`${API_URL}/rooms/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Failed to delete the room')
}
