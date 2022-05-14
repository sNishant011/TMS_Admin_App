import { useContext } from 'react'
import { UserContext } from '../context/UserContextProvider'

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('must be inside provider')
  }
  const { allUsers, userCount } = context

  return {
    allUsers,
    userCount,
  }
}
