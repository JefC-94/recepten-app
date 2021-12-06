import * as React from 'react'
import { Button, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './style/theme'
import Typography from '@mui/material/Typography'
import type {} from '@mui/lab/themeAugmentation'
import { Test } from './containers/Test'

export const App = () => (
  <ThemeProvider theme={theme}>
    <div style={{ height: '100px' }}>
      <div style={{ borderBottom: '1px solid #ccc' }}>
        <Button variant="primary">Hello world</Button>
        <Button variant="secondary">Hello world</Button>
        <Button variant="text" onClick={() => console.log('hello')}>
          Hello world
        </Button>
      </div>
      <Box sx={{ p: 2, border: `1px dashed ${theme.palette.border.main}` }}>
        <Button>Save</Button>
      </Box>
      <Typography color="secondary.main">Test</Typography>
      <Typography color="warning.dark">Alert</Typography>
      <Test />
    </div>
  </ThemeProvider>
)
