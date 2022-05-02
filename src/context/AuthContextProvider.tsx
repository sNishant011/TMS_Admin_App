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
type ResponseTokenType = {
  access: string
  refresh: string
}
type ResponseType = {
  status: number
  data: ResponseTokenType
}
export type authContextType = {
  user: string
  login: (email: string, password: string, remember_me: boolean) => void
  logout: () => void
}
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authToken, setAuthToken] = useState<ResponseTokenType | null>(null)
  const [user, setUser] = useState('')
  let [res, setRes] = useState<ResponseType | null>(null)
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])
  useEffect(() => {
    if (res) {
      if (res.status === 200) {
        setAuthToken(res.data)
        setUser(res.data.access)
        showNotification({
          title: 'Welcome Admin!',
          message: 'Login Successful!',
          styles: (theme) => NotificationSuccessTheme(theme),
        })
      } else {
        showNotification({
          title: 'Wrong credentials',
          message: 'Please enter the correct email and password!',
          styles: (theme) => NotificationErrorTheme(theme),
        })
      }
    }
  }, [res])

  const login = (email: string, password: string, remember_me: boolean) => {
    // let res = await axios.post(`${BASE_API_ROUTE}/auth`, {
    //   email: email,
    //   password: password,
    // })
    if (email === 'admin@tms.com' && password === 'admin') {
      if (remember_me) {
        localStorage.setItem(
          'user',
          JSON.stringify({ access: 'admin', refresh: 'admin' })
        )
      }
      setRes({
        status: 200,
        data: {
          access: 'admin',
          refresh: 'admin',
        },
      })
    } else {
      setRes({
        status: 400,
        data: {
          access: '',
          refresh: '',
        },
      })
    }
  }

  const logout = () => {
    setUser('')
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
    user,
    login,
    logout,
  }
  return (
    <AuthContext.Provider value={config}>
      <div>{children}</div>
    </AuthContext.Provider>
  )
}
export default AuthContextProvider
