'use client';
 
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/routing';
import { routing } from '@/lib/i18n/routing';
 
export default function Header() {
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
 
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
    { code: 'nl', name: 'Nederlands' },
  ];
 
  const handleLanguageChange = (locale: string) => {
    setIsLangOpen(false);
    router.replace(pathname, { locale });
  };
 
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">
              Industrial
            </span>
          </Link>
 
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {t('products')}
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {t('about')}
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {t('contact')}
            </Link>
          </div>
 
          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
              >
                <span className="text-sm">{t('language')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
 
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
 
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
              >
                {t('home')}
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
              >
                {t('products')}
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
              >
                {t('about')}
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
              >
                {t('contact')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
