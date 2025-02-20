import { groq } from 'next-sanity'

export const getIngredientsQuery = groq`
  *[_type == "ingredient"] {
    _id,
    name,
    category,
    unit
  }
`

export const getRecipesByIngredientsQuery = groq`
  *[_type == "recipe" && references($ingredientIds[])] {
    _id,
    title,
    description,
    "slug": slug.current,
    mainImage,
    prepTime,
    cookTime,
    servings,
    ingredients[] {
      amount,
      "ingredient": ingredient->{
        _id,
        name,
        unit
      }
    }
  }
`

export const getRecipeBySlugQuery = groq`
  *[_type == "recipe" && slug.current == $slug][0] {
    _id,
    title,
    description,
    "slug": slug.current,
    mainImage,
    prepTime,
    cookTime,
    servings,
    ingredients[] {
      amount,
      "ingredient": ingredient->{
        _id,
        name,
        unit
      }
    },
    instructions,
    categories
  }
` 