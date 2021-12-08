import type {} from '@mui/lab/themeAugmentation'
import { base } from './base'
import { createTheme } from '@mui/material/styles'
import { Button } from './Button'

declare module '@mui/material/styles' {
  interface Palette {
    border: Palette['primary']
  }
  interface PaletteOptions {
    border: PaletteOptions['primary']
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: base.primary,
    },
    secondary: {
      main: base.secondary,
    },
    border: {
      main: base.border,
    },
  },
  typography: {
    fontFamily: 'Avenir, sans-serif',
  },
})

theme = createTheme(theme, {
  components: {
    MuiButton: Button,
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        body: {
          maxHeight: '100vh',
          width: '100vw',
          overflowX: 'hidden',
        },
      },
    },
  },
})

export default theme
