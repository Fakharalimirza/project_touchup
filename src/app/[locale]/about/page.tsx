import { Metadata } from 'next';
import Image from 'next/image';
import { Target, Eye, Heart } from 'lucide-react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'AboutPage' });
 
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

const values = [
  {
    icon: Target,
    titleKey: 'missionTitle',
    textKey: 'missionText'
  },
  {
    icon: Eye,
    titleKey: 'visionTitle',
    textKey: 'visionText'
  },
  {
    icon: Heart,
    titleKey: 'valuesTitle',
    textKey: 'valuesText'
  }
];

export default async function AboutPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return (
    <>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{t('title')}</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-headline text-primary">{t('whoWeAreTitle')}</h2>
              <p className="text-muted-foreground">
                {t('whoWeAreP1')}
              </p>
              <p className="text-muted-foreground">
                {t('whoWeAreP2')}
              </p>
            </div>
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                alt={t('whoWeAreTitle')}
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="maintenance workers"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.titleKey} className="text-center p-6">
                <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold font-headline mb-2">{t(value.titleKey as any)}</h3>
                <p className="text-muted-foreground">{t(value.textKey as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
