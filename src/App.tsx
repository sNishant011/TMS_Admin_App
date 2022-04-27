import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  const { isLoggedIn } = useAuth()
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Dashboard /> : <Login />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
