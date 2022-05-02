import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('must be inside provider')
  }
  const { user, login, logout } = context

  return { user, login, logout }
}
