import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { loginUser, registerUser } from '../services/auth.service'

export const useAuth = () => {
  const { user, isAuthenticated, loading, login: contextLogin, logout: contextLogout } = useContext(AuthContext)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      setError(null)
      const data = await loginUser(email, password)
      contextLogin(data.token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  const register = async (name, email, password) => {
    try {
      setError(null)
      const data = await registerUser(name, email, password)
      contextLogin(data.token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  const logout = () => {
    contextLogout()
    navigate('/login')
  }

  return { user, isAuthenticated, loading, error, login, register, logout }
}
