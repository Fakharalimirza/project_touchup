import { Suspense } from 'react';
import { Metadata } from 'next';
import BookingForm from '@/components/booking-form';
import BookingFormSkeleton from '@/components/booking-form-skeleton';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'BookingPage' });
 
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function BookingPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'BookingPage' });

  return (
    <div className="container py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{t('title')}</h1>
          <p className="text-lg text-muted-foreground mt-4">
            {t('subtitle')}
          </p>
        </div>
        
        <Suspense fallback={<BookingFormSkeleton />}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
