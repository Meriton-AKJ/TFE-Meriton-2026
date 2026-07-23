const API_URL = `${import.meta.env.VITE_API_URL}/auth`

export const getToken = () => localStorage.getItem('token')

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
})

export const isAuthenticated = () => !!getToken()

export const getUser = () => {
  const token = getToken()
  if (!token) return null
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || "Erreur lors de l'inscription")
  localStorage.setItem('token', data.token)
  return data
}

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Identifiants incorrects')
  localStorage.setItem('token', data.token)
  return data
}

export const logout = () => {
  localStorage.removeItem('token')
}
