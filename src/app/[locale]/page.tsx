import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import StatsSection from '@/components/sections/StatsSection';
import CTASection from '@/components/sections/CTASection';
 
type Props = {
  params: Promise<{ locale: string }>;
};
 
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
 
  return {
    title: t('title'),
    description: t('description'),
  };
}
 
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
 
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
