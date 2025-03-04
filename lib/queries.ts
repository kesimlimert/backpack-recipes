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
  *[_type == "recipe" && count(ingredients[references($ingredientIds[])]) == count($ingredientIds)] {
    _id,
    title,
    description,
    "slug": slug.current,
    mainImage,
    prepTime,
    cookTime,
    servings,
    "ingredients": ingredients[]->{
      _id,
      name,
      category,
      unit
    }
  }
`

export const getRecipeBySlugQuery = groq`
  *[_type == "recipe" && slug.current == $slug][0] {
    _id,
    title,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    ingredientsList,
    instructions
  }
` 