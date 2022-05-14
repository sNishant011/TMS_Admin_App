import { createContext, useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import { BASE_API_ROUTE } from '../configs/constants'
import { showNotification } from '@mantine/notifications'
import {
  NotificationErrorTheme,
  NotificationSuccessTheme,
} from '../themes/NotificationThemes'

export const AuthContext = createContext<authContextType | null>(null)

type AuthContextProviderProps = {
  children: React.ReactNode
}
export type authContextType = {
  authToken: string | null
  login: (email: string, password: string, remember_me: boolean) => void
  logout: () => void
}
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null)
  // const [user, setUser] = useState('')
  let [res, setRes] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token as string)
    }
  }, [])
  useEffect(() => {
    if (res) {
      console.log(res)
      if (res.status === 200) {
        setAuthToken(res.data.jwt)
        if (res.remember_me) {
          localStorage.setItem('token', res.data.jwt)
        }
        showNotification({
          title: 'Welcome Admin!',
          message: 'Login Successful!',
          styles: (theme) => NotificationSuccessTheme(theme),
        })
      } else {
        showNotification({
          title: res.data.detail,
          message: 'Please enter the correct email and password!',
          styles: (theme) => NotificationErrorTheme(theme),
        })
      }
    }
  }, [res])

  const login = async (
    email: string,
    password: string,
    remember_me: boolean
  ) => {
    axios
      .post(`${BASE_API_ROUTE}/accounts/login`, {
        email: email,
        password: password,
      })
      .then((res: any) => setRes({ ...res, remember_me }))
      .catch((err: any) => setRes(err.response))
  }

  const logout = () => {
    // setUser('')
    localStorage.removeItem('token')
    setAuthToken(null)
    showNotification({
      title: 'Logout Successfull',
      message: 'Your session is now over!',
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.green[8],
          borderColor: theme.colors.green[8],

          '&::before': { backgroundColor: theme.white },
        },

        title: { color: theme.white },
        description: { color: theme.white },
        closeButton: {
          color: theme.white,
          '&:hover': { backgroundColor: theme.colors.green[8] },
        },
      }),
    })
  }
  const config = {
    login,
    authToken,
    logout,
  }
  return (
    <AuthContext.Provider value={config}>
      <div>{children}</div>
    </AuthContext.Provider>
  )
}
export default AuthContextProvider
