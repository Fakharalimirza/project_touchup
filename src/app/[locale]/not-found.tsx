import { Button } from '@/components/ui/button';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { AlertTriangle } from 'lucide-react';

// This file is automatically used by Next.js App Router for 404 errors.
// We are using `unstable_setRequestLocale` to make sure the page is localized.

export default async function NotFoundPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'NotFoundPage' });

  return (
    <div className="container flex items-center justify-center text-center py-20 min-h-[60vh]">
      <div className="flex flex-col items-center gap-6">
        <AlertTriangle className="w-24 h-24 text-primary" />
        <h1 className="text-5xl md:text-7xl font-bold font-headline text-primary">
          404
        </h1>
        <h2 className="text-3xl font-semibold font-headline">{t('title')}</h2>
        <p className="max-w-md text-lg text-muted-foreground">
          {t('description')}
        </p>
        <Button asChild size="lg">
          <Link href="/">{t('goHome')}</Link>
        </Button>
      </div>
    </div>
  );
}
