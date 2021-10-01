import React, { useCallback, useEffect, useMemo, useState } from 'react'
import '../styles/globals.css'
import '../public/fonts/fonts.css'
import type { AppProps } from 'next/app'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline, useMediaQuery } from '@material-ui/core'
import { getTheme } from '../components/Theme'
import Layout from '../components/Layout/Layout'


type UserContextType = {
  authToken: string,
  setAuthToken: React.Dispatch<React.SetStateAction<string>>,
  hasChecked: boolean,
  isMediaPhone: boolean,
  snackBarActive: boolean,
  switchSnackBar: () => void
}
export const UserContext = React.createContext({} as UserContextType)
const UserProvider = UserContext.Provider

function MyApp({ Component, pageProps }: AppProps) {

  // Dark Mode

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

  // Authentication

  const [authToken, setAuthToken] = useState('')
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken')
      if (token && typeof (token) === 'string') {
        setAuthToken(token)
      }
    } catch { }
    setHasChecked(true)
  }, [])

  // Media query

  const isMediaPhone = useMediaQuery('(max-width:700px)')


  // Snackbar notifications

  const [snackBarActive, setSnackBarActive] = useState(true)
  useEffect(() => {
    try {
      setSnackBarActive(localStorage.getItem('snack-bar') === 'false' ? false : true)
    } catch { }
  }, [])

  const switchSnackBar = useCallback(() => {
    if (snackBarActive) {
      try {
        localStorage.setItem('snack-bar', 'false')
      } catch { }
      setSnackBarActive(false)
    } else {
      try {
        localStorage.removeItem('snack-bar')
      } catch { }
      setSnackBarActive(true)
    }
  }, [snackBarActive, setSnackBarActive])

  const user = useMemo(() => ({
    authToken,
    setAuthToken,
    hasChecked,
    isMediaPhone,
    snackBarActive,
    switchSnackBar
  }), [authToken, setAuthToken, hasChecked, isMediaPhone, snackBarActive, switchSnackBar])

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
