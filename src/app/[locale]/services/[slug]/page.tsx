import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { slug: string, locale: string };
};

export async function generateMetadata({ params: { slug, locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Services' });
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: t(service.titleKey),
    description: t(service.descriptionKey),
  };
}

export async function generateStaticParams() {
  return services.map(service => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params: { slug, locale } }: Props) {
  unstable_setRequestLocale(locale);
  const tServices = await getTranslations({ locale, namespace: 'Services' });
  const tGeneral = await getTranslations({ locale, namespace: 'General' });
  const service = services.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-card">
      <div className="container py-16">
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/services" className="flex items-center gap-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              {tGeneral('backToServices')}
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image
                src={service.image}
                alt={tServices(service.titleKey)}
                fill
                className="object-cover"
                data-ai-hint={service.dataAiHint}
              />
            </div>
          </div>
          <div className="space-y-6">
            <span className="text-primary font-semibold">{tGeneral('service')}</span>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">{tServices(service.titleKey)}</h1>
            <p className="text-lg text-muted-foreground">{tServices(service.detailsKey)}</p>

            {service.subServiceKeys && service.subServiceKeys.length > 0 && (
              <div className="pt-4 space-y-4">
                <h3 className="text-2xl font-semibold font-headline text-primary">{tGeneral('ourOfferings')}</h3>
                <ul className="space-y-3">
                  {service.subServiceKeys.map((subKey, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent mt-1 shrink-0" />
                      <span className="text-muted-foreground">{tServices(subKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button asChild size="lg">
              <Link href={`/booking?service=${service.slug}`}>{tGeneral('bookThisService')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
