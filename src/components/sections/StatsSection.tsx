import { useTranslations } from 'next-intl';
 
export default function StatsSection() {
  const t = useTranslations('stats');
  const stats = t.raw('items') as Array<{ value: string; label: string }>;
 
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-primary to-primary-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl lg:text-4xl font-bold mb-12">
          {t('title')}
        </h2>
 
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-white/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
