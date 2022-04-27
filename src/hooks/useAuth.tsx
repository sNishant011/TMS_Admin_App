import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('must be inside provider')
  }
  const { isLoggedIn, setIsLoggedIn, authToken, setAuthToken } = context

  return { isLoggedIn, setIsLoggedIn, authToken, setAuthToken }
}
