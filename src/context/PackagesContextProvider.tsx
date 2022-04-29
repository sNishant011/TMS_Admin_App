import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { BASE_API_ROUTE } from '../configs/constants'
import { Package } from '../configs/customTypes'
import {
  NotificationErrorTheme,
  NotificationSuccessTheme,
} from '../themes/NotificationThemes'

export type packageContextType = {
  allPackages: Package[] | null
  setAllPackages: React.Dispatch<React.SetStateAction<Package[] | null>>
  deletePackage: (package_slug: string) => void
}

export const PackagesContext = createContext<packageContextType | null>(null)
type PackagesContextProviderProps = {
  children: React.ReactNode
}

const PackagesContextProvider = ({
  children,
}: PackagesContextProviderProps) => {
  const [allPackages, setAllPackages] = useState<Package[] | null>(null)

  const deletePackage = (package_slug: string) => {
    axios
      .delete(`${BASE_API_ROUTE}/tour-packages/${package_slug}/`)
      .then((res) => {
        showNotification({
          title: 'Successfull',
          message: 'Package deleted successfully',
          styles: (theme) => NotificationSuccessTheme(theme),
        })
        if (allPackages) {
          setAllPackages(allPackages?.filter((p1) => p1.slug !== package_slug))
        }
      })
      .catch((err) =>
        showNotification({
          title: 'Error',
          message: `Couldn't delete package.`,
          styles: (theme) => NotificationErrorTheme(theme),
        })
      )
  }

  const config = {
    allPackages,
    setAllPackages,
    deletePackage,
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
