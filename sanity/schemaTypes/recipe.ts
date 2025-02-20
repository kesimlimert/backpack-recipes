import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'prepTime',
      title: 'Preparation Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'cookTime',
      title: 'Cooking Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'servings',
      title: 'Number of Servings',
      type: 'number',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'ingredient',
              title: 'Ingredient',
              type: 'reference',
              to: [{ type: 'ingredient' }],
            },
            {
              name: 'amount',
              title: 'Amount',
              type: 'number',
            },
          ],
          preview: {
            select: {
              ingredientName: 'ingredient.name',
              amount: 'amount',
              unit: 'ingredient.unit',
            },
            prepare({ ingredientName, amount, unit }) {
              return {
                title: `${amount} ${unit} ${ingredientName}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ingredientsList',
      title: 'Ingredients List',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [{title: 'Numbered', value: 'number'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
    }),
  ],
}) 