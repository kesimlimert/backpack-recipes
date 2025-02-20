import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/image'
import { Recipe } from '@/types/recipe'
import { client } from '@/sanity/client'
import { getRecipeBySlugQuery } from '@/lib/queries'
import { useEffect, useState } from 'react'

type RecipeCardProps = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null)
  const imageUrl = recipe.mainImage ? urlForImage(recipe.mainImage)?.url() : null

  useEffect(() => {
    async function loadRecipeDetails() {
      const details = await client.fetch(getRecipeBySlugQuery, { slug: recipe.slug })
      setRecipeDetails(details)
    }
    loadRecipeDetails()
  }, [recipe.slug])

  const validIngredients = recipeDetails?.ingredientsList || []
  
  return (
    <Link href={`/recipes/${recipe.slug}`}>
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-indigo-500 transition-all duration-200 h-[600px] flex flex-col">
        {imageUrl ? (
          <div className="relative h-56 w-full shrink-0">
            <Image
              src={imageUrl}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-56 bg-gray-100 flex items-center justify-center shrink-0">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
            {recipe.title}
          </h3>
          <p className="text-gray-700 text-base mb-4 line-clamp-2">
            {recipe.description}
          </p>
          
          <div className="flex-1 overflow-y-auto mb-4">
            {validIngredients.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Ingredients:</h4>
                <div className="flex flex-wrap gap-1">
                  {validIngredients.map((ingredient, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-medium text-gray-600"
                    >
                      {ingredient.children[0].text}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center text-gray-600 text-sm font-medium pt-2 border-t border-gray-100">
            <span>Prep: {recipe.prepTime}min</span>
            <span className="mx-3">•</span>
            <span>Cook: {recipe.cookTime}min</span>
          </div>
        </div>
      </div>
    </Link>
  )
} 