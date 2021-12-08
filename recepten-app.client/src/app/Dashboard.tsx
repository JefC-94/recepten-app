import { Box, Button } from '@mui/material'
import theme from '../style/theme'
import Typography from '@mui/material/Typography'
import { Test } from '../containers/Test'
import { useUserContext } from '../contexts/UserContext'

export function Dashboard() {
  const { logoutUser } = useUserContext()

  return (
    <>
      <Box sx={{ m: 1, p: 2, border: `1px solid ${theme.palette.border.main}` }}>
        <Typography>The Recepten App</Typography>
      </Box>
      <Button
        onClick={() => {
          logoutUser()
        }}
      >
        Logout
      </Button>
      <Test />
    </>
  )
}
