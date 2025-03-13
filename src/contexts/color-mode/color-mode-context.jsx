import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react'
import { useMediaQuery } from '@mui/material'

export const ColorModeContext = createContext()

export function ColorModeProvider({ children }) {
  const storedMode = localStorage.getItem('theme') // Pobierz zapisany motyw
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState(
    storedMode || (prefersDarkMode ? 'dark' : 'light')
  )

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newMode) // Zapisz nowy motyw
      return newMode
    })
  }, [])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'dark' ? '#121212' : '#f0f0f0',
            paper: mode === 'dark' ? '#1e1e1e' : '#ffffff'
          },
          customGreen: mode === 'dark' ? 'lightgreen' : 'green',
          customBlue: mode === 'dark' ? 'lightblue' : 'blue',
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useColorMode = () => {
  const context = useContext(ColorModeContext)

  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider')
  }

  return context
}
