'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/client'
import { getIngredientsQuery, getRecipesByIngredientsQuery } from '@/lib/queries'
import IngredientSelector from '@/components/IngredientSelector'
import RecipeCard from '@/components/RecipeCard'
import { Recipe, Ingredient } from '@/types/recipe'

export default function Home() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCount, setSelectedCount] = useState(0)

  useEffect(() => {
    const loadIngredients = async () => {
      const data = await client.fetch(getIngredientsQuery)
      setIngredients(data)
      setLoading(false)
    }
    loadIngredients()
  }, [])

  const handleIngredientSelection = async (selectedIds: string[]) => {
    setSelectedCount(selectedIds.length)
    if (selectedIds.length === 0) {
      setRecipes([])
      return
    }

    const recipes = await client.fetch(getRecipesByIngredientsQuery, {
      ingredientIds: selectedIds
    })
    setRecipes(recipes)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Recipes by Ingredients
          </h1>
          <p className="text-lg text-gray-700">
            Select ingredients you have to find matching recipes
          </p>
          {selectedCount > 0 && (
            <p className="text-lg font-medium text-indigo-600 mt-4">
              {selectedCount} ingredient{selectedCount !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>
        
        <div className="mb-12 bg-gray-100 rounded-xl p-8">
          <IngredientSelector 
            ingredients={ingredients}
            onSelectionChange={handleIngredientSelection}
          />
        </div>

        {recipes.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Found {recipes.length} Recipe{recipes.length !== 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </div>
        ) : selectedCount > 0 ? (
          <div className="text-center text-lg text-gray-700 font-medium">
            No recipes found with selected ingredients
          </div>
        ) : null}
      </main>
    </div>
  )
}
