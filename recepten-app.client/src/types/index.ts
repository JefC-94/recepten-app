import { Unit, Ingredient, Category, Type, Cuisine, Dish } from './dish'
import { Cart, CartItem } from './cart'

export type { Unit, Ingredient, Category, Type, Cuisine, Dish }
export type { Cart, CartItem }

export type UserContextProps = {
  rootState: AuthObject
  logoutUser: () => Promise<void>
  registerUser: (user: User) => Promise<any>
  loginUser: (user: User) => Promise<any>
  editUser: (user: User) => Promise<any>
  isLoggedIn: () => Promise<void>
}

export type AuthObject = {
  isAuth: boolean
  theUser: User | null
}

export type User = {
  id: number
  username: string
  password: string
  oldPassword?: string
  newPassword?: string
  email: string
  photo_url: string | null
  created_at: number
  updated_at: number | null
}

export type Response = {
  success: 0 | 1
  message: string
}
