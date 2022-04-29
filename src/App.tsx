import { Box } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'
import NavbarMinimal from './components/NavbarMinimal'
import { useAuth } from './hooks/useAuth'
import AllPackages from './pages/AllPackages'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) {
    return <Login />
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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
