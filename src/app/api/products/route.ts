import { NextResponse } from 'next/server'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 't8o1zoqj'
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export async function GET() {
  try {
    const query = encodeURIComponent(`*[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      slug,
      category->{_id, title, slug},
      description,
      images,
      specifications,
      price,
      featured
    }`)

    const response = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 } // Revalidate every 60 seconds
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const data = await response.json()
    return NextResponse.json(data.result || [])
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json([])
  }
}
