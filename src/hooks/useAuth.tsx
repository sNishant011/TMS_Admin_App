import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('must be inside provider')
  }
  const { authToken, login, logout } = context

  return { authToken, login, logout }
}
