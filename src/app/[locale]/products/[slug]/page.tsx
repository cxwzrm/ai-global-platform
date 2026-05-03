import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import CTASection from '@/components/sections/CTASection'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

// Fetch single product from Sanity
async function getProduct(slug: string) {
  const PROJECT_ID = 't8o1zoqj'
  const DATASET = 'production'
  
  const query = encodeURIComponent(`*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
    name,
    slug,
    "category": category->{_id, title, slug},
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
      return null
    }
    
    const data = await response.json()
    return data.result || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.name?.[locale] || product.name?.en || 'Product',
    description: product.description?.[locale] || product.description?.en || '',
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'products' })
  const tBtn = await getTranslations({ locale, namespace: 'buttons' })
  
  const product = await getProduct(slug)

  if (!product) {
    notFound()
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
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/products" className="text-gray-500 hover:text-primary transition-colors">
                {t('title')}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-primary font-medium">
              {product.name?.[locale] || product.name?.en || 'Product'}
            </li>
          </ol>
        </div>
      </nav>

      {/* Product Details */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <svg className="w-40 h-40 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              {/* Featured Badge */}
              {product.featured && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Category */}
              {product.category?.title && (
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  {product.category.title[locale] || product.category.title.en}
                </span>
              )}
              
              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name?.[locale] || product.name?.en}
              </h1>

              {/* Price */}
              <div className="text-3xl font-bold text-accent mb-6">
                {formatPrice(product.price)}
              </div>

              {/* Description */}
              <div className="prose prose-gray max-w-none mb-8">
                <p className="text-gray-600 leading-relaxed">
                  {product.description?.[locale] || product.description?.en}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" className="btn-primary text-center">
                  {t('details.requestQuote')}
                </Link>
                <Link href="/contact" className="btn-outline text-center">
                  {t('details.features')}
                </Link>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('details.specifications')}
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-100">
                    {product.specifications.power && (
                      <tr>
                        <td className="px-6 py-4 text-gray-500 font-medium">Power</td>
                        <td className="px-6 py-4 text-gray-900">{product.specifications.power}</td>
                      </tr>
                    )}
                    {product.specifications.cuttingArea && (
                      <tr>
                        <td className="px-6 py-4 text-gray-500 font-medium">Cutting Area</td>
                        <td className="px-6 py-4 text-gray-900">{product.specifications.cuttingArea}</td>
                      </tr>
                    )}
                    {product.specifications.precision && (
                      <tr>
                        <td className="px-6 py-4 text-gray-500 font-medium">Precision</td>
                        <td className="px-6 py-4 text-gray-900">{product.specifications.precision}</td>
                      </tr>
                    )}
                    {product.specifications.maxSpeed && (
                      <tr>
                        <td className="px-6 py-4 text-gray-500 font-medium">Max Speed</td>
                        <td className="px-6 py-4 text-gray-900">{product.specifications.maxSpeed}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  )
}
