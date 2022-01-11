import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'

const tempUser = {
  password: 'azerty123',
  email: 'philip@hotmail.com',
}

export const Lobby = () => {
  const { rootState, loginUser, isLoggedIn } = useUserContext()

  let location = useLocation()
  let navigate = useNavigate()

  let from = location.state?.from?.pathname || ''

  const demoLogin = async (demoUser: any) => {
    const data = await loginUser(demoUser)
    if (data.success && data.token) {
      localStorage.setItem('loginToken', data.token)
      await isLoggedIn()
      navigate(from, { replace: true })
    }
  }

  if (rootState.isAuth) {
    return <Navigate to="/dashboard" />
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
