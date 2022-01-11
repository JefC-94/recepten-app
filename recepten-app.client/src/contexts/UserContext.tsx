import { createContext, useContext, useEffect, useState } from 'react'
import { AuthObject, User, UserContextProps } from '../types'
import axios from 'axios'

export const UserContext = createContext<UserContextProps>(null!)

export const UserContextProvider = (props: any) => {
  const [rootState, setRootState] = useState<AuthObject>({ isAuth: false, theUser: null })

  useEffect(() => {
    isLoggedIn()
  }, [])

  const logoutUser = async () => {
    localStorage.removeItem('loginToken')
    setRootState({ isAuth: false, theUser: null })
  }

  const registerUser = async (user: User) => {
    const timestamp = Math.floor(new Date().getTime() / 1000)
    const register = await axios.post('http://localhost:7555/api/auth/register', {
      username: user.username,
      email: user.email,
      password: user.password,
      created_at: timestamp,
    })

    return register.data
  }

  const loginUser = async (user: User) => {
    const login = await axios.post('http://localhost:7555/api/auth/login', {
      email: user.email,
      password: user.password,
    })
    console.log(login.data)
    return login.data
  }

  const editUser = async (user: User) => {
    const timestamp = Math.floor(new Date().getTime() / 1000)
    const edit = await axios.put('http://localhost:7555/api/auth/edit', {
      id: user.id,
      username: user.username,
      oldPassword: user.oldPassword,
      newPassword: user.newPassword,
      updated_at: timestamp,
    })
    return edit.data
  }

  const isLoggedIn = async () => {
    const loginToken = localStorage.getItem('loginToken')

    if (loginToken) {
      //Adding JWT token to axios default header
      axios.defaults.headers.common['x-access-token'] = loginToken

      const { data } = await axios.get('http://localhost:7555/api/auth/me')

      // console.log(data) //logs current logged in user

      if (data.user) {
        setRootState(prevValue => ({ ...prevValue, isAuth: true, theUser: data.user }))
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        rootState,
        logoutUser,
        loginUser,
        registerUser,
        editUser,
        isLoggedIn,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
