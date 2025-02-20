import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'unit',
      title: 'Unit of Measurement',
      type: 'string',
      options: {
        list: [
          'grams',
          'kg',
          'ml',
          'l',
          'cup',
          'tablespoon',
          'teaspoon',
          'piece',
          'to taste',
        ],
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
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
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
}) 