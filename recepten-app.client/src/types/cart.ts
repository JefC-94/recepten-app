import { User } from './index'

export type CartItem = {
  id: number
  cart_id: number
  ingredient_id: number
  ingredient: number
  quantity?: number
}

export type Cart = {
  id: number
  user_id: number
  user: User
  cartItems: CartItem[]
}
