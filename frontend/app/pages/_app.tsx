import React, { useCallback, useEffect, useMemo, useState } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { getTheme } from '../components/Theme'
import Layout from '../components/Layout/Layout'



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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout darkMode={darkMode} switchDarkMode={switchDarkMode}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>


  )
}
export default MyApp
