import React, { useCallback, useEffect, useMemo, useState } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { getTheme } from '../components/Theme'
import Layout from '../components/Layout/Layout'


type UserContextType = {
  authToken: string,
  setAuthToken: React.Dispatch<React.SetStateAction<string>>
}
export const UserContext = React.createContext({} as UserContextType)
const UserProvider = UserContext.Provider

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false)
  const switchDarkMode = useCallback(() => {
    try {
      localStorage.setItem('dark-mode', darkMode ? 'false' : 'true')
    } catch { }
    setDarkMode(!darkMode)
  }, [darkMode])
  useEffect(() => {
    try {
      setDarkMode(localStorage.getItem('dark-mode') === 'true')
    } catch { }
  }, [])
  const theme = useMemo(() => createTheme(getTheme(darkMode)), [darkMode])

  const [authToken, setAuthToken] = useState('')
  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken')
      if (token && typeof (token) === 'string') {
        setAuthToken(token)
      }
    } catch { }
  }, [])
  const user = useMemo(() => ({
    authToken,
    setAuthToken
  }), [authToken, setAuthToken])

  return (
    <ThemeProvider theme={theme}>
      <UserProvider value={user}>
        <CssBaseline />
        <Layout darkMode={darkMode} switchDarkMode={switchDarkMode}>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ThemeProvider>


  )
}
export default MyApp
