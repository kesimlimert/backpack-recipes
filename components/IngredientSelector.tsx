import { useState } from 'react'

type Ingredient = {
  _id: string
  name: string
  category: string
  unit: string
}

type Category = {
  title: string
  value: string
}

const categories: Category[] = [
  { title: 'Proteins', value: 'proteins' },
  { title: 'Dairy & Dairy Alternatives', value: 'dairy' },
  { title: 'Grains & Starches', value: 'grains' },
  { title: 'Vegetables', value: 'vegetables' },
  { title: 'Fruits', value: 'fruits' },
  { title: 'Herbs & Spices', value: 'herbs' },
  { title: 'Oils & Fats', value: 'oils' },
  { title: 'Condiments & Sauces', value: 'condiments' },
  { title: 'Sweeteners', value: 'sweeteners' },
  { title: 'Nuts & Seeds', value: 'nuts' },
  { title: 'Baking & Thickening Agents', value: 'baking' },
]

export default function IngredientSelector({
  ingredients,
  onSelectionChange,
}: {
  ingredients: Ingredient[]
  onSelectionChange: (selectedIds: string[]) => void
}) {
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set())

  const toggleIngredient = (id: string) => {
    const newSelection = new Set(selectedIngredients)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedIngredients(newSelection)
    onSelectionChange(Array.from(newSelection))
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const categoryIngredients = ingredients.filter(
          (ing) => ing.category === category.value
        )
        
        if (categoryIngredients.length === 0) return null

        return (
          <div key={category.value} className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {category.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {categoryIngredients.map((ingredient) => (
                <button
                  key={ingredient._id}
                  onClick={() => toggleIngredient(ingredient._id)}
                  className={`
                    px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${selectedIngredients.has(ingredient._id)
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }
                  `}
                >
                  {ingredient.name}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
} 