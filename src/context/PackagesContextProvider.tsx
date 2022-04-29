import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { BASE_API_ROUTE } from '../configs/constants'
import { Package } from '../configs/customTypes'

export type packageContextType = {
  allPackages: Package[] | null
  setAllPackages: React.Dispatch<React.SetStateAction<Package[] | null>>
}

export const PackagesContext = createContext<packageContextType | null>(null)
type PackagesContextProviderProps = {
  children: React.ReactNode
}

const PackagesContextProvider = ({
  children,
}: PackagesContextProviderProps) => {
  const [allPackages, setAllPackages] = useState<Package[] | null>(null)
  const config = {
    allPackages,
    setAllPackages,
  }

  useEffect(() => {
    axios
      .get(`${BASE_API_ROUTE}/tour-packages/`)
      .then((res) => setAllPackages(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <PackagesContext.Provider value={config}>
      <div>{children}</div>
    </PackagesContext.Provider>
  )
}
export default PackagesContextProvider
