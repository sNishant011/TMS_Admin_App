import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import AuthContextProvider from './context/AuthContextProvider'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const myTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  primaryColor: 'cyan',
  fontFamily: 'Poppins, sans-serif',
  defaultRadius: 3,
}
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MantineProvider theme={myTheme}>
        <App />
      </MantineProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
