import React from 'react'
import { useUserContext } from '../contexts/UserContext'
import { User } from '../types'

const tempUser = {
  password: 'azerty123',
  email: 'philip@hotmail.com',
}

export const Lobby = () => {
  const { loginUser, isLoggedIn } = useUserContext()

  const demoLogin = async (demoUser: any) => {
    const data = await loginUser(demoUser)
    if (data.success && data.token) {
      localStorage.setItem('loginToken', data.token)
      await isLoggedIn()
    }
  }

  return (
    <div>
      <p>Welcome to the application. Please login.</p>
      <button
        onClick={() => {
          demoLogin(tempUser)
        }}
      >
        Login
      </button>
    </div>
  )
}

export default Lobby
