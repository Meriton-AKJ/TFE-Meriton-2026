const API_URL = import.meta.env.VITE_API_URL

export const sendContact = async (data) => {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Erreur lors de l\'envoi')
  return json
}
