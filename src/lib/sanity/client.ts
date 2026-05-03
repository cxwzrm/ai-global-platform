import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
 
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
 
const builder = imageUrlBuilder(client)
 
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
 
// Queries
export const productsQuery = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  category->,
  description,
  images,
  specifications,
  price,
  featured
}`
 
export const featuredProductsQuery = `*[_type == "product" && featured == true] {
  _id,
  name,
  slug,
  category->,
  description,
  images,
  specifications,
  price
}`
 
export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  category->,
  description,
  images,
  specifications,
  price
}`
 
export const categoriesQuery = `*[_type == "category"] | order(order asc) {
  _id,
  title,
  slug,
  description
}`
 
export const settingsQuery = `*[_type == "setting"][0]`
