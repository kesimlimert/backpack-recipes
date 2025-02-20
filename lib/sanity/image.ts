import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '@/sanity/env'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

type SanityImage = SanityImageSource & {
  asset?: {
    _ref: string
  }
}

export const urlForImage = (source: SanityImage) => {
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder.image(source).auto('format').fit('max')
} 