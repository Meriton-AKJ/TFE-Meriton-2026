import { Navigate } from 'react-router-dom'
import { getUser } from '../services/auth.service.js'

function AdminRoute({ children }) {
  const user = getUser()
  if (!user || user.role !== 'ADMIN') return <Navigate to="/" replace />
  return children
}

export default AdminRoute
