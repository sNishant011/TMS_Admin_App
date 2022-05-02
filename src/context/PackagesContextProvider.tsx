import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { BASE_API_ROUTE } from '../configs/constants'
import { Package, UploadPackage } from '../configs/customTypes'
import {
  NotificationErrorTheme,
  NotificationSuccessTheme,
} from '../themes/NotificationThemes'

export type packageContextType = {
  allPackages: Package[] | null
  setAllPackages: React.Dispatch<React.SetStateAction<Package[] | null>>
  deletePackage: (package_slug: string) => void
  getPackageBySlug: (package_slug: string) => Package | void
  editPackage: (p1: Package) => void
  addPackage: (p1: UploadPackage) => void
}

export const PackagesContext = createContext<packageContextType | null>(null)
type PackagesContextProviderProps = {
  children: React.ReactNode
}

const PackagesContextProvider = ({
  children,
}: PackagesContextProviderProps) => {
  const [allPackages, setAllPackages] = useState<Package[] | null>(null)

  const getPackageBySlug = (package_slug: string) => {
    if (allPackages) {
      const package1 = allPackages.find((p1) => p1.slug === package_slug)
      return package1
    } else {
      return
    }
  }
  const editPackage = (p1: Package) => {
    const { thumbnail_Image, ...p2 } = p1
    console.log(p2)
    axios
      .put(`${BASE_API_ROUTE}/tour-packages/${p1.slug}/`, p2, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        showNotification({
          title: 'Successfull',
          message: 'Package edited successfully',
          styles: (theme) => NotificationSuccessTheme(theme),
        })
        if (allPackages) {
          setAllPackages([
            ...allPackages.filter((p) => p.id !== p1.id),
            res.data,
          ])
        }
      })
      .catch((err) => {
        console.log(err)
        showNotification({
          title: 'Error',
          message: `Couldn't edit package.`,
          styles: (theme) => NotificationErrorTheme(theme),
        })
      })
  }

  const addPackage = (p1: UploadPackage) => {
    console.log(p1)
    axios
      .post(`${BASE_API_ROUTE}/tour-packages/`, p1, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        showNotification({
          title: 'Successfull',
          message: 'Package added successfully',
          styles: (theme) => NotificationSuccessTheme(theme),
        })
        if (allPackages) {
          setAllPackages([...allPackages, res.data])
        }
      })
      .catch((err) => {
        console.log(err)
        showNotification({
          title: 'Error',
          message: `Couldn't save package.`,
          styles: (theme) => NotificationErrorTheme(theme),
        })
      })
  }

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
    getPackageBySlug,
    editPackage,
    addPackage,
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
