import React from 'react'
import { useUserContext } from '../contexts/UserContext'

export const Lobby = () => {
  const { loginUser } = useUserContext()

  return (
    <div>
      <p>Welcome to the application. Please login.</p>
      <button
        onClick={() => {
          loginUser()
        }}
      >
        Login
      </button>
    </div>
  )
}

export default Lobby
