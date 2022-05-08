import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import AuthContextProvider from './context/AuthContextProvider'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import './styles/global.css'
import { NotificationsProvider } from '@mantine/notifications'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import { ModalsProvider } from '@mantine/modals'
import PackagesContextProvider from './context/PackagesContextProvider'
import BlogsContextProvider from './context/BlogsContextProvider'
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
      <PackagesContextProvider>
        <BlogsContextProvider>
          <MantineProvider theme={myTheme}>
            <NotificationsProvider>
              <ModalsProvider>
                <BrowserRouter>
                  <Routes>
                    <Route element={<App />} path='/*' />
                    <Route element={<NotFound />} path='*' />
                  </Routes>
                </BrowserRouter>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </BlogsContextProvider>
      </PackagesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

reportWebVitals()
