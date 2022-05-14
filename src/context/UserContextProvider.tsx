import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { BASE_API_ROUTE } from '../configs/constants'
import { UserType } from '../configs/customTypes'

type UserContextType = {
  allUsers: UserType[] | null
  userCount: number
}

export const UserContext = createContext<UserContextType | null>(null)

type UserContextProviderProps = {
  children: React.ReactNode
}
const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [allUsers, setAllUsers] = useState<UserType[] | null>(null)
  const [userCount, setUserCount] = useState<number>(0)

  useEffect(() => {
    axios.get(`${BASE_API_ROUTE}/accounts/?admin=false`).then((res) => {
      setAllUsers(res.data)
    })
  }, [])

  useEffect(() => {
    if (allUsers) {
      setUserCount(allUsers.length)
    }
  }, [allUsers])
  const context = {
    allUsers,
    userCount,
  }
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserContextProvider
