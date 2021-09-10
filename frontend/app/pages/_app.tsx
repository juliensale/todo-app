import { useEffect, useMemo, useState } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline, darken } from '@material-ui/core'
import { getTheme } from '../components/Theme'



function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    try {
      setDarkMode(localStorage.getItem('dark-mode') === 'true')
    } catch { }
  }, [])
  const theme = useMemo(() => createTheme(getTheme(darkMode)), [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>


  )
}
export default MyApp
