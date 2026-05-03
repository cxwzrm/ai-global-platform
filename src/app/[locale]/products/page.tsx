import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import CTASection from '@/components/sections/CTASection'

type Props = {
  params: Promise<{ locale: string }>
}

// Fetch products from Sanity
async function getProducts() {
  const PROJECT_ID = 't8o1zoqj'
  const DATASET = 'production'
  
  const query = encodeURIComponent(`*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    "category": category->{_id, title},
    description,
    specifications,
    price,
    featured
  }`)

  try {
    const response = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
      { next: { revalidate: 60 } }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    
    const data = await response.json()
    return data.result || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'products' })

  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'products' })
  const tNav = await getTranslations({ locale, namespace: 'navigation' })
  
  // Fetch products from Sanity
  const products = await getProducts()

  // Get localized category name
  const getCategoryName = (category: any) => {
    if (!category?.title) return ''
    return category.title[locale] || category.title.en || ''
  }

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-600 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug?.current || product._id}`}
                  className="card group hover:shadow-xl transition-all duration-300"
                >
                  {/* Product Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center group-hover:from-primary/10 group-hover:to-accent/10 transition-colors overflow-hidden">
                    {/* Show product icon based on category */}
                    <div className="text-center p-4">
                      {product.slug?.current?.includes('lw') ? (
                        <svg className="w-20 h-20 mx-auto text-primary/40 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ) : (
                        <svg className="w-20 h-20 mx-auto text-primary/40 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  {getCategoryName(product.category) && (
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2">
                      {getCategoryName(product.category)}
                    </span>
                  )}
                  
                  {/* Product Name */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {product.name?.[locale] || product.name?.en || 'Product'}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description?.[locale] || product.description?.en || ''}
                  </p>
                  
                  {/* Price & Specs */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-accent">
                      {formatPrice(product.price)}
                    </span>
                    {product.specifications?.power && (
                      <span className="text-xs text-gray-500">
                        {product.specifications.power}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  )
}
