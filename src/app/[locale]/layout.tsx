import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import { Inter, Orbitron } from 'next/font/google';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: {
    default: 'Touchup Building Maintenance - Home & Building Maintenance Services in Dubai',
    template: '%s | Touchup Building Maintenance',
  },
  description: 'Professional building maintenance, cleaning, AC repair, plumbing, electrical, and painting services in Dubai. Book online today!',
  keywords: ['building maintenance dubai', 'home maintenance dubai', 'cleaning services dubai', 'ac repair dubai', 'plumbing services dubai', 'electrical services dubai', 'painting services dubai', 'pest control dubai', 'handyman services dubai', 'property maintenance'],
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'ar'}];
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning className={`${inter.variable} ${orbitron.variable}`}>
      <head />
      <body className="font-body antialiased" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
