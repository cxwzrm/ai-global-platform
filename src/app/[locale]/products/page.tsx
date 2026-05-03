import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import CTASection from '@/components/sections/CTASection';
 
type Props = {
  params: Promise<{ locale: string }>;
};
 
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
 
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}
 
export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
 
  const t = await getTranslations({ locale, namespace: 'products' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
 
  // Mock products data - will be replaced with Sanity data
  const products = [
    {
      id: '1',
      name: 'AII-LC500 Fiber Laser Cutting Machine',
      category: 'laserCutting',
      image: '/images/products/lc500.jpg',
      description: 'High-power fiber laser cutting machine for metal processing',
    },
    {
      id: '2',
      name: 'AII-LW300 Laser Welding System',
      category: 'laserWelding',
      image: '/images/products/lw300.jpg',
      description: 'Precision laser welding machine for various materials',
    },
    {
      id: '3',
      name: 'AII-LC700 Sheet Metal Laser Cutter',
      category: 'laserCutting',
      image: '/images/products/lc700.jpg',
      description: 'Large format laser cutting for industrial applications',
    },
    {
      id: '4',
      name: 'AII-LW500 Automated Welding Cell',
      category: 'laserWelding',
      image: '/images/products/lw500.jpg',
      description: 'Robotic laser welding system for mass production',
    },
    {
      id: '5',
      name: 'AII-ACC01 Laser Optics Kit',
      category: 'accessories',
      image: '/images/products/acc01.jpg',
      description: 'Premium optics and accessories for laser systems',
    },
    {
      id: '6',
      name: 'AII-ACC02 Cooling System',
      category: 'accessories',
      image: '/images/products/acc02.jpg',
      description: 'Industrial chiller for continuous laser operation',
    },
  ];
 
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center group-hover:from-primary/10 group-hover:to-accent/10 transition-colors">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2">
                  {t(`categories.${product.category}`)}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
 
      <CTASection />
    </div>
  );
}
