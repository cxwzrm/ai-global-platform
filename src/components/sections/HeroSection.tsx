import { useTranslations } from 'next-intl';
import Link from 'next/link';
 
export default function HeroSection() {
  const t = useTranslations('hero');
  const tBtn = useTranslations('buttons');
 
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t('title')}
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="btn-primary text-center">
                {t('cta')}
              </Link>
              <Link href="/contact" className="btn-outline text-center">
                {t('secondaryCta')}
              </Link>
            </div>
          </div>
 
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-2xl opacity-20 blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-primary to-accent rounded-2xl p-8 lg:p-12">
              <div className="aspect-square bg-white/10 rounded-xl flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <p className="text-xl font-semibold">AI-Powered Laser Technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100/30 to-transparent pointer-events-none"></div>
    </section>
  );
}
