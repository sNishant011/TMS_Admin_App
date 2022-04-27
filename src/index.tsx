import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import AuthContextProvider from './context/AuthContextProvider'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import './styles/global.css'
import { NotificationsProvider } from '@mantine/notifications'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { ModalsProvider } from '@mantine/modals'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const myTheme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'blue',
  fontFamily: 'Poppins, sans-serif',
  defaultRadius: 3,
  breakpoints: {
    xs: 500,
    sm: 800,
    md: 1000,
    lg: 1200,
    xl: 1400,
  },
}
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MantineProvider theme={myTheme}>
        <NotificationsProvider>
          <ModalsProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<App />} path='/*' />
                <Route element={<Login />} path='*' />
              </Routes>
            </BrowserRouter>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

reportWebVitals()
