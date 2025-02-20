import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

type RecipeCardProps = {
  recipe: {
    _id: string
    title: string
    description: string
    slug: string
    mainImage: SanityImageSource
    prepTime: number
    cookTime: number
  }
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const imageUrl = recipe.mainImage ? urlForImage(recipe.mainImage)?.url() : null

  return (
    <Link href={`/recipes/${recipe.slug}`}>
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-indigo-500 transition-all duration-200">
        {imageUrl && (
          <div className="relative h-56 w-full">
            <Image
              src={imageUrl}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
            {recipe.title}
          </h3>
          <p className="text-gray-700 text-base mb-4 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center text-gray-600 text-sm font-medium">
            <span>Prep: {recipe.prepTime}min</span>
            <span className="mx-3">•</span>
            <span>Cook: {recipe.cookTime}min</span>
          </div>
        </div>
      </div>
    </Link>
  )
} 