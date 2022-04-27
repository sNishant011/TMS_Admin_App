import { createContext, useEffect, useState } from 'react'
import React from 'react'

export type authContextType = {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  authToken: string
  setAuthToken: React.Dispatch<React.SetStateAction<string>>
}
export const AuthContext = createContext<authContextType | null>(null)

type AuthContextProviderProps = {
  children: React.ReactNode
}
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authToken, setAuthToken] = useState('')
  useEffect(() => {
    const prevState = localStorage.getItem('isLoggedIn')
    if (prevState) {
      setIsLoggedIn(() => Boolean(prevState))
    }
  }, [])
  const config = {
    isLoggedIn,
    setIsLoggedIn,
    authToken,
    setAuthToken,
  }
  return (
    <AuthContext.Provider value={config}>
      <div>{children}</div>
    </AuthContext.Provider>
  )
}
export default AuthContextProvider
