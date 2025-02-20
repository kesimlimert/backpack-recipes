import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { PortableTextBlock } from '@portabletext/types'

export type Ingredient = {
  _id: string
  name: string
  category: string
  unit: string
}

export type Recipe = {
  _id: string
  title: string
  description: string
  slug: string
  mainImage: SanityImageSource
  prepTime: number
  cookTime: number
  servings: number
  ingredients: Ingredient[]
  ingredientsList: PortableTextBlock[]
} 