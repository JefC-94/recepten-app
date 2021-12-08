import { createContext, useContext, useState } from 'react'
import { AuthObject, User, UserContextProps } from '../types'

const tempUser = {
  id: 4,
  username: 'John',
  password: 'safds8f4efsf48aesf4',
  email: 'john@gmail.com',
  photo_url: 'http://google.be',
  created_at: 1846848,
  updated_at: null,
}

export const UserContext = createContext<UserContextProps>(null!)

export const UserContextProvider = (props: any) => {
  const [rootState, setRootState] = useState<AuthObject>({ isAuth: false, theUser: null })

  const logoutUser = async () => {
    localStorage.removeItem('loginToken')
    setRootState({ isAuth: false, theUser: null })
  }

  const loginUser = async () => {
    setRootState({ isAuth: true, theUser: tempUser })
  }

  return (
    <UserContext.Provider
      value={{
        rootState,
        logoutUser,
        loginUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
