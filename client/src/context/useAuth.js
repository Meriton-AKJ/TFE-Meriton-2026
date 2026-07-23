import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  loginUser as loginService,
  registerUser as registerService,
  logout as logoutService,
  isAuthenticated,
  getUser,
} from '../services/auth.service'

export const useAuth = () => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      setError(null)
      await loginService(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  const register = async (name, email, password) => {
    try {
      setError(null)
      await registerService(name, email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  const logout = () => {
    logoutService()
    navigate('/login')
  }

  return {
    isAuthenticated: isAuthenticated(),
    user: getUser(),
    error,
    login,
    register,
    logout,
  }
}
