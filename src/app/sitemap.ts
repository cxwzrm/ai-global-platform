import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aiindustrial.com'
  const locales = ['en', 'de', 'es', 'fr', 'it', 'nl']
 
  const staticPages = ['', '/products', '/about', '/contact']
 
  const sitemapEntries: MetadataRoute.Sitemap = []
 
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      })
    }
  }
 
  return sitemapEntries
}
