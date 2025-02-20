import { client } from '@/sanity/client'
import { getRecipeBySlugQuery } from '@/lib/queries'
import Image from 'next/image'
import { urlForImage } from '@/sanity/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { ingredientComponents, instructionComponents } from '@/components/PortableTextComponents'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { PortableTextBlock } from '@portabletext/types'

type Recipe = {
  _id: string
  title: string
  description: string
  mainImage: SanityImageSource
  prepTime: number
  cookTime: number
  servings: number
  ingredientsList: PortableTextBlock[]
  instructions: PortableTextBlock[]
}

async function getRecipe(slug: string): Promise<Recipe | null> {
  return await client.fetch(getRecipeBySlugQuery, { slug })
}

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
    const recipe = await getRecipe(slug)

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h1>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  const imageUrl = recipe.mainImage ? urlForImage(recipe.mainImage)?.url() : null

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to search
        </Link>

        <article className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
          {imageUrl && (
            <div className="relative h-[400px] w-full">
              <Image
                src={imageUrl}
                alt={recipe.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
            <p className="text-xl text-gray-700 mb-8">{recipe.description}</p>

            <div className="grid grid-cols-3 gap-6 mb-12 p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-gray-600 text-sm font-medium mb-1">Prep Time</p>
                <p className="text-2xl font-bold text-gray-900">{recipe.prepTime} min</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm font-medium mb-1">Cook Time</p>
                <p className="text-2xl font-bold text-gray-900">{recipe.cookTime} min</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm font-medium mb-1">Servings</p>
                <p className="text-2xl font-bold text-gray-900">{recipe.servings}</p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <PortableText 
                  value={recipe.ingredientsList} 
                  components={ingredientComponents}
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <PortableText 
                  value={recipe.instructions} 
                  components={instructionComponents}
                />
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
} 