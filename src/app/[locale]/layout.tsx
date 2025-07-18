import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import { Inter, Orbitron } from 'next/font/google';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import ClientHeader from '@/components/layout/client-header';
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://touchup.ae';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Touchup Building Maintenance - Home & Building Maintenance Services in Dubai',
    template: '%s | Touchup Building Maintenance',
  },
  description: 'Professional building maintenance, cleaning, AC repair, plumbing, electrical, and painting services in Dubai. Book online today!',
  keywords: ['building maintenance dubai', 'home maintenance dubai', 'cleaning services dubai', 'ac repair dubai', 'plumbing services dubai', 'electrical services dubai', 'painting services dubai', 'pest control dubai', 'handyman services dubai', 'property maintenance'],
  openGraph: {
    title: {
        default: 'Touchup Building Maintenance - Home & Building Maintenance Services in Dubai',
        template: '%s | Touchup Building Maintenance',
    },
    description: 'Your trusted partner for home maintenance in Dubai. We offer cleaning, AC, plumbing, and electrical services.',
    url: '/',
    siteName: 'Touchup Building Maintenance',
    images: [
      {
        url: '/og-image.png', // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: 'Touchup Building Maintenance Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
        default: 'Touchup Building Maintenance - Home & Building Maintenance Services in Dubai',
        template: '%s | Touchup Building Maintenance',
    },
    description: 'Your trusted partner for home maintenance in Dubai. We offer cleaning, AC, plumbing, and electrical services.',
    images: ['/og-image.png'], // Must be an absolute URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
              <ClientHeader />
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
