import { Box } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'
import NavbarMinimal from './components/NavbarMinimal'
import { useAuth } from './hooks/useAuth'
import AddPackage from './pages/AddPackage'
import AllPackages from './pages/AllPackages'
import Dashboard from './pages/Dashboard'
import EditPackage from './pages/EditPackage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  const { authToken } = useAuth()
  if (!authToken) {
    return (
      <Routes>
        <Route path='/*' element={<Login />} />
      </Routes>
    )
  }
  return (
    <Box
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <NavbarMinimal />
      <Box style={{ padding: '1rem', width: '100%' }}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/packages' element={<AllPackages />} />
          <Route
            path='/packages/edit-package/:packageSlug'
            element={<EditPackage />}
          />

          <Route path='/packages/add-package' element={<AddPackage />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
