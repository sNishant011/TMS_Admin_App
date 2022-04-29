import { useContext } from 'react'
import { PackagesContext } from '../context/PackagesContextProvider'

export const usePackage = () => {
  const context = useContext(PackagesContext)
  if (!context) {
    throw new Error('must be inside provider')
  }
  const { allPackages, deletePackage, setAllPackages } = context

  return { allPackages, deletePackage, setAllPackages }
}
