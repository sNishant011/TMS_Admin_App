import { useContext } from 'react'
import { PackagesContext } from '../context/PackagesContextProvider'

export const usePackage = () => {
  const context = useContext(PackagesContext)
  if (!context) {
    throw new Error('must be inside provider')
  }
  const {
    allPackages,
    editPackage,
    deletePackage,
    getPackageBySlug,
    addPackage,
    setAllPackages,
  } = context

  return {
    allPackages,
    editPackage,
    addPackage,
    deletePackage,
    getPackageBySlug,
    setAllPackages,
  }
}
