import { type SchemaTypeDefinition } from 'sanity'
import recipe from './recipe'
import ingredient from './ingredient'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [recipe, ingredient],
}
