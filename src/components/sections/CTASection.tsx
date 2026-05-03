import { useTranslations } from 'next-intl';
import Link from 'next/link';
 
export default function CTASection() {
  const t = useTranslations('cta');
  const tBtn = useTranslations('buttons');
 
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-accent-50 to-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="section-title mb-4">
          {t('title')}
        </h2>
        <p className="section-subtitle mb-8">
          {t('subtitle')}
        </p>
        <Link href="/contact" className="btn-secondary inline-block">
          {t('button')}
        </Link>
      </div>
    </section>
  );
}
