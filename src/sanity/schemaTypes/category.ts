import { defineType, defineField } from 'sanity'
 
export const categorySchema = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
        source: 'title.en',
        maxLength: 96,
      },
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
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
    },
  },
})
