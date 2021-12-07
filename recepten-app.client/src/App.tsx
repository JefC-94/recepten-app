import * as React from 'react'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './style/theme'
import Typography from '@mui/material/Typography'
import type {} from '@mui/lab/themeAugmentation'
import { Test } from './containers/Test'

export const App = () => (
  <ThemeProvider theme={theme}>
    <div>
      <Box sx={{ m: 1, p: 2, border: `1px solid ${theme.palette.border.main}` }}>
        <Typography>The Recepten App</Typography>
      </Box>
      <Test />
    </div>
  </ThemeProvider>
)
