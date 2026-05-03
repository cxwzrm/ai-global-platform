import { defineType, defineField } from 'sanity'
 
export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'de', title: 'German', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
        { name: 'fr', title: 'French', type: 'string' },
        { name: 'it', title: 'Italian', type: 'string' },
        { name: 'nl', title: 'Dutch', type: 'string' },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'de', title: 'German', type: 'text' },
        { name: 'es', title: 'Spanish', type: 'text' },
        { name: 'fr', title: 'French', type: 'text' },
        { name: 'it', title: 'Italian', type: 'text' },
        { name: 'nl', title: 'Dutch', type: 'text' },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        { name: 'power', title: 'Power (W)', type: 'string' },
        { name: 'cuttingArea', title: 'Cutting Area (mm)', type: 'string' },
        { name: 'precision', title: 'Precision (mm)', type: 'string' },
        { name: 'maxSpeed', title: 'Max Speed (mm/s)', type: 'string' },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'category.title.en',
      media: 'images.0',
    },
  },
})
