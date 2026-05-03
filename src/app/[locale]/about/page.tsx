import { getTranslations, setRequestLocale } from 'next-intl/server';
import CTASection from '@/components/sections/CTASection';
 
type Props = {
  params: Promise<{ locale: string }>;
};
 
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
 
  return {
    title: t('title'),
  };
}
 
export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
 
  const t = await getTranslations({ locale, namespace: 'about' });
 
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-600 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t('title')}</h1>
        </div>
      </section>
 
      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="card">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('mission.title')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('mission.content')}</p>
            </div>
 
            <div className="card">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('vision.title')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('vision.content')}</p>
            </div>
          </div>
        </div>
      </section>
 
      {/* Team */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title">{t('team.title')}</h2>
            <p className="section-subtitle">{t('team.subtitle')}</p>
          </div>
 
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Wei Zhang', role: 'CEO & Founder', image: '/images/team/wei-zhang.jpg' },
              { name: 'Sarah Chen', role: 'CTO', image: '/images/team/sarah-chen.jpg' },
              { name: 'Prof. Michael Weber', role: 'Head of AI Research', image: '/images/team/michael-weber.jpg' },
            ].map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      <CTASection />
    </div>
  );
}
