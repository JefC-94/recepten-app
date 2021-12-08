import { User } from './index'

export type Unit = {
  id: number
  name: string
  name_plural?: string
}

export type Ingredient = {
  id: number
  name: string
  name_plural?: string
  unit_id?: number
}

export type Category = {
  id: number
  name: string
}

export type Type = {
  id: number
  name: string
}

export type Cuisine = {
  id: number
  name: string
}

export type Dish = {
  id: number
  name: string
  description: string | null
  recipe: string | null
  image_url: string | null
  cooking_time: number
  created_at: number
  updated_at: number | null
  user_id: number
  user: User
  categories: Category[]
  cuisines: Cuisine[]
  ingredients: Ingredient[]
  types: Type[]
  favorite: boolean | null
}
