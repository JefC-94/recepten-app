import { Button } from '@mui/material'
import React from 'react'
import { useUserContext } from '../contexts/UserContext'

export const Lobby = () => {
  const { loginUser } = useUserContext()

  return (
    <div>
      <p>Welcome to the application. Please login.</p>
      <Button
        onClick={() => {
          loginUser()
        }}
      >
        Login
      </Button>
    </div>
  )
}

export default Lobby
