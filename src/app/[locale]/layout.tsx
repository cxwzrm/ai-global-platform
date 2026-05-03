import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
 
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
 
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
 
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  setRequestLocale(locale);
 
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
